import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { githubBlob, sitePath, type TrackId } from './paths'

export interface RenderContext {
  track: TrackId
}

const SERIAL_RE = /^(FDE|AI|ALG)-\d+/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function protect(source: string, pattern: RegExp): { text: string; slots: string[] } {
  const slots: string[] = []
  const text = source.replace(pattern, (match) => {
    slots.push(match)
    return `\u0000SLOT${slots.length - 1}\u0000`
  })
  return { text, slots }
}

function restore(text: string, slots: string[]): string {
  return text.replace(/\u0000SLOT(\d+)\u0000/g, (_, index: string) => slots[Number(index)] ?? '')
}

/** Notes use $$…$$ and \(…\). remark-math reads dollar delimiters. */
export function normalizeMath(source: string): string {
  const fenced = protect(source, /```[\s\S]*?```/g)
  const coded = protect(fenced.text, /`[^`\n]*`/g)
  const normalized = coded.text
    .replace(/\\\[([\s\S]+?)\\\]/g, (_, expr: string) => `\n$$\n${expr.trim()}\n$$\n`)
    .replace(/\\\(([\s\S]+?)\\\)/g, (_, expr: string) => `$${expr}$`)
    // A single-line $$...$$ is inline to remark-math. Notes use it as display math.
    .replace(/^\$\$([^\n]+?)\$\$[ \t]*$/gm, (_, expr: string) => `\n$$\n${expr.trim()}\n$$\n`)
  return restore(restore(normalized, coded.slots), fenced.slots)
}

function trackForSerial(prefix: string): TrackId {
  if (prefix === 'FDE') return 'fde'
  if (prefix === 'AI') return 'ai'
  return 'algorithms'
}

function rewriteUrl(url: string, track: TrackId): string {
  if (!url || url.startsWith('#') || url.startsWith('mailto:') || /^https?:\/\//i.test(url)) return url
  const hashIndex = url.indexOf('#')
  const pathPart = hashIndex >= 0 ? url.slice(0, hashIndex) : url
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : ''
  let decoded = pathPart
  try {
    decoded = decodeURIComponent(pathPart)
  } catch {
    decoded = pathPart
  }
  const baseName = decoded.split('/').pop() ?? ''
  if (baseName === 'README.en.md') {
    const dir = track === 'fde' ? 'hk-fde' : track === 'ai' ? 'ai-glossary' : 'ai-algorithms'
    return githubBlob(`notes/${dir}/README.en.md`) + hash
  }
  if (baseName === 'README.md') {
    const folder = decoded.includes('ai-glossary')
      ? 'ai'
      : decoded.includes('ai-algorithms')
        ? 'algorithms'
        : decoded.includes('hk-fde')
          ? 'fde'
          : track
    return sitePath(`/${folder}`) + hash
  }
  const serial = baseName.match(SERIAL_RE)
  if (serial) {
    const prefix = serial[0].split('-')[0] ?? ''
    return sitePath(`/${trackForSerial(prefix)}/${serial[0]}`)
  }
  const dir = track === 'fde' ? 'hk-fde' : track === 'ai' ? 'ai-glossary' : 'ai-algorithms'
  const relative = decoded.replace(/^\.\//, '')
  return githubBlob(`notes/${dir}/${relative}`)
}

function remarkRewriteLinks(ctx: RenderContext) {
  return (tree: unknown) => {
    visit(tree as never, 'link', (node: { url: string; data?: { hProperties?: Record<string, unknown> } }) => {
      node.url = rewriteUrl(node.url, ctx.track)
      const props: Record<string, unknown> = {}
      if (/^https?:\/\//i.test(node.url)) {
        props.target = '_blank'
        props.rel = 'noopener noreferrer'
      }
      if (/youtube\.com|youtu\.be/i.test(node.url)) props.className = ['yt']
      if (Object.keys(props).length > 0) {
        node.data = node.data ?? {}
        node.data.hProperties = { ...node.data.hProperties, ...props }
      }
    })
  }
}

function textOf(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const record = node as { type?: string; value?: string; children?: unknown[] }
  if (record.type === 'text') return record.value ?? ''
  return (record.children ?? []).map(textOf).join('')
}

function rehypeEnrich() {
  return (tree: unknown) => {
    visit(tree as never, 'element', (node: { tagName?: string; properties?: Record<string, unknown>; children?: unknown[] }, index: number | undefined, parent: { tagName?: string; properties?: Record<string, unknown>; children: unknown[] } | undefined) => {
      if (!node.tagName) return
      if (node.tagName === 'blockquote') {
        const text = textOf(node).replace(/\s/g, '')
        const ascii = text.replace(/[^\x00-\x7F]/g, '').length
        if (text.length > 24 && ascii / text.length > 0.82) {
          node.properties = node.properties ?? {}
          node.properties.lang = 'en'
        }
      }
      if (node.tagName === 'table' && parent && typeof index === 'number') {
        const className = parent.properties?.className
        const already = Array.isArray(className) && className.includes('table-scroll')
        if (!already) {
          parent.children[index] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'], tabIndex: 0 },
            children: [node],
          }
        }
      }
    })
  }
}

function nodeText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const record = node as { type?: string; value?: string; children?: unknown[] }
  if (record.type === 'text') return record.value ?? ''
  return (record.children ?? []).map(nodeText).join('')
}

/** Headings such as 「一、定义」 already carry a number. Do not prefix another. */
function headingHasOwnNumber(node: Record<string, unknown>): boolean {
  const text = nodeText(node).trim()
  return /^(?:[一二三四五六七八九十百零]+[、.．]|[0-9]{1,2}[、.．.)]|（[一二三四五六七八九十0-9]+）|\([0-9]+\))/.test(text)
}

function rehypeSectionBlocks() {
  return (tree: { children?: Array<Record<string, unknown>> }) => {
    const children = tree.children
    if (!children) return
    const next: Array<Record<string, unknown>> = []
    let section: { children: Array<Record<string, unknown>> } | null = null
    let index = 0
    const headings = children.filter((child) => child.type === 'element' && child.tagName === 'h2')
    const lessonNumbersItself = headings.some((heading) => headingHasOwnNumber(heading))
    for (const child of children) {
      const isHeading = child.type === 'element' && child.tagName === 'h2'
      if (isHeading) {
        const existing = Array.isArray(child.children) ? child.children : []
        if (!lessonNumbersItself && !headingHasOwnNumber(child)) {
          index += 1
          const label = String(index).padStart(2, '0')
          child.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['block-index'], ariaHidden: 'true' },
              children: [{ type: 'text', value: label }],
            },
            ...existing,
          ]
        }
        section = {
          type: 'element',
          tagName: 'section',
          properties: { className: ['block'] },
          children: [child],
        }
        next.push(section as unknown as Record<string, unknown>)
      } else if (section) {
        section.children.push(child)
      } else {
        next.push(child)
      }
    }
    tree.children = next
  }
}

function toHtml(markdown: string, ctx: RenderContext): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath, { singleDollarTextMath: true })
    .use(remarkRewriteLinks, ctx)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeEnrich)
    .use(rehypeKatex, { throwOnError: true, strict: 'ignore', output: 'html' })
    .use(rehypeSectionBlocks)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(markdown)
  return String(file)
}

function stripDangerous(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<iframe\b[^>]*\/>/gi, '')
    .replace(/<(object|embed)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
}

export function renderMarkdown(source: string, ctx: RenderContext): string {
  const normalized = normalizeMath(source)
  const blocks: string[] = []
  const withPlaceholders = normalized.replace(/<details\b[^>]*>[\s\S]*?<\/details>/gi, (full) => {
    const matched = full.match(/<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>\s*$/i)
    if (!matched) return full
    const summary = (matched[1] ?? '').trim()
    const inner = (matched[2] ?? '').trim()
    const innerHtml = toHtml(inner, ctx)
    blocks.push(`<details><summary>${escapeHtml(summary)}</summary>${innerHtml}</details>`)
    return `\n\n%%DETAILS_${blocks.length - 1}%%\n\n`
  })
  let html = toHtml(withPlaceholders, ctx)
  html = html.replace(/<p>\s*%%DETAILS_(\d+)%%\s*<\/p>/g, (_, index: string) => blocks[Number(index)] ?? '')
  if (html.includes('%%DETAILS_')) {
    throw new Error('Failed to place a <details> block while rendering markdown')
  }
  return stripDangerous(html)
}
