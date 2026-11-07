import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { renderMarkdown } from './render'
import { githubBlob, sitePath, type TrackId } from './paths'

const NOTES_ROOT = fileURLToPath(new URL('../../../notes', import.meta.url))
const REPO_ROOT = dirname(NOTES_ROOT)

export interface LessonLink {
  serial: string
  title: string
  href: string
}

export interface SectionHeading {
  id: string
  index: string
  title: string
}

export interface Lesson {
  track: TrackId
  serial: string
  title: string
  pageTitle: string
  date: string | null
  day: string | null
  theme: string | null
  difficulty: string | null
  term: string | null
  interviewFrequency: string | null
  scenario: string | null
  filename: string
  githubUrl: string
  href: string
  description: string
  html: string
  sections: SectionHeading[]
  showToc: boolean
  related: LessonLink[]
  prev: LessonLink | null
  next: LessonLink | null
}

export interface Track {
  id: TrackId
  index: string
  name: string
  shortName: string
  navLabel: string
  promise: string
  lede: string
  href: string
  enHref: string
  count: number
  rangeLabel: string
  lessons: Lesson[]
}

const TRACK_META: Record<
  TrackId,
  { index: string; name: string; shortName: string; navLabel: string; dir: string; promise: string }
> = {
  fde: {
    index: '01',
    name: 'FDE 短课',
    shortName: 'FDE 短课',
    navLabel: '短课',
    dir: 'hk-fde',
    promise: '每天一课，按真实 FDE 项目的顺序讲：场景→类比→原理→面试→自测',
  },
  ai: {
    index: '02',
    name: 'AI 科普',
    shortName: 'AI 科普',
    navLabel: '科普',
    dir: 'ai-glossary',
    promise: '常见 AI 名词，讲清原理、坑和面试怎么答',
  },
  algorithms: {
    index: '03',
    name: 'AI 算法',
    shortName: 'AI 算法',
    navLabel: '算法',
    dir: 'ai-algorithms',
    promise: '从易到难的算法，讲清什么时候用、什么时候别用',
  },
}

const PREFIX: Record<TrackId, string> = {
  fde: 'FDE',
  ai: 'AI',
  algorithms: 'ALG',
}

function readText(path: string): string {
  return readFileSync(path, 'utf8').replace(/^\uFEFF/, '')
}

function assertPromises(): void {
  const root = readText(join(REPO_ROOT, 'README.md'))
  for (const [id, meta] of Object.entries(TRACK_META) as [TrackId, (typeof TRACK_META)[TrackId]][]) {
    if (!root.includes(meta.promise)) {
      throw new Error(`README.md no longer contains the ${id} track promise: ${meta.promise}`)
    }
  }
}

function splitRow(line: string): string[] {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function isSeparator(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell))
}

function firstTable(markdown: string): { headers: string[]; rows: string[][] } {
  const lines = markdown.split('\n').map((line) => line.trim())
  const start = lines.findIndex((line) => line.startsWith('|') && line.endsWith('|'))
  if (start < 0) return { headers: [], rows: [] }
  const headers = splitRow(lines[start] ?? '')
  const rows: string[][] = []
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i] ?? ''
    if (!line.startsWith('|')) break
    const cells = splitRow(line)
    if (isSeparator(cells)) continue
    rows.push(cells)
  }
  return { headers, rows }
}

function column(headers: string[], row: string[], names: string[]): string {
  for (const name of names) {
    const index = headers.indexOf(name)
    if (index >= 0) return (row[index] ?? '').trim()
  }
  return ''
}

function parseLinkCell(cell: string): { text: string; href: string | null } {
  // Filenames keep terms in parentheses, e.g. AI-01-AI幻觉(Hallucination).md.
  const matched = cell.match(/\[([^\]]+)\]\(([^()\s]+(?:\([^()\s]*\)[^()\s]*)*)\)/)
  if (!matched) return { text: cell.trim(), href: null }
  return { text: (matched[1] ?? '').trim(), href: (matched[2] ?? '').trim() }
}

function readLede(markdown: string): string {
  const lines = markdown.split('\n')
  let index = lines[0]?.startsWith('#') ? 1 : 0
  const buffer: string[] = []
  for (; index < lines.length; index++) {
    const line = (lines[index] ?? '').trim()
    if (line.startsWith('**中文**') || line.startsWith('[中文]')) break
    if (!line) {
      if (buffer.length) break
      continue
    }
    if (line.startsWith('#')) break
    buffer.push(line)
  }
  const lede = buffer.join(' ')
  const mark = '先做再打开。'
  const cut = lede.indexOf(mark)
  if (cut >= 0) return lede.slice(0, cut + mark.length)
  return lede
}

function field(line: string, label: string): string | null {
  const matched = line.match(new RegExp(`\\*\\*${label}\\*\\*\\s*([^·]+?)\\s*(?:·|$)`))
  return matched?.[1]?.trim() || null
}

function parseMetaLine(line: string | null): {
  date: string | null
  day: string | null
  theme: string | null
  difficulty: string | null
  interviewFrequency: string | null
} {
  if (!line) {
    return { date: null, day: null, theme: null, difficulty: null, interviewFrequency: null }
  }
  const day = line.match(/Day\s+(\d+)/i)?.[1] ?? null
  return {
    date: line.match(/\*\*(\d{4}-\d{2}-\d{2})\*\*/)?.[1] ?? null,
    day,
    theme: field(line, '主题板块') ?? field(line, '分类'),
    difficulty: field(line, '难度'),
    interviewFrequency: field(line, '面试频率'),
  }
}

function splitDocument(raw: string): { pageTitle: string | null; metaLine: string | null; body: string } {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  let index = 0
  let pageTitle: string | null = null
  if (lines[index]?.startsWith('# ')) {
    pageTitle = lines[index]?.slice(2).trim() ?? null
    index += 1
  }
  while (lines[index] === '') index += 1
  let metaLine: string | null = null
  if (lines[index] && /^\*\*(?:FDE|AI|ALG)-\d+\*\*/.test(lines[index].trim())) {
    metaLine = lines[index].trim()
    index += 1
  }
  while (lines[index] === '') index += 1
  return { pageTitle, metaLine, body: `${lines.slice(index).join('\n').trim()}\n` }
}

function plain(markdown: string): string {
  return markdown
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+\$/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[*_~`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function firstParagraph(markdown: string): string {
  const lines = markdown.split('\n')
  const buffer: string[] = []
  for (const line of lines) {
    const text = line.trim()
    if (!text) {
      if (buffer.length) break
      continue
    }
    if (/^#{1,6}\s/.test(text) || text.startsWith('|') || text.startsWith('<') || text.startsWith('```') || text === '---') {
      if (buffer.length) break
      continue
    }
    buffer.push(text)
  }
  return plain(buffer.join(' '))
}

function clip(value: string, max = 140): string {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const punctuation = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('，'))
  const base = punctuation > 60 ? cut.slice(0, punctuation + 1) : cut
  return `${base.replace(/[，、\s]+$/u, '')}…`
}

function prefer(primary: string, fallback: string | null): string | null {
  const first = primary.trim()
  if (first) return first
  const second = (fallback ?? '').trim()
  return second || null
}

function dayLabel(day: string | null): string | null {
  if (!day) return null
  return /^day\s/i.test(day) ? day : `Day ${day}`
}

function rangeLabel(lessons: Lesson[]): string {
  if (lessons.length === 0) return '—'
  const first = lessons[0]?.serial
  const last = lessons[lessons.length - 1]?.serial
  if (!first) return '—'
  if (lessons.length === 1 || first === last) return first
  return `${first} – ${last}`
}

const CURATED_RELATED: Record<string, string[]> = {
  'AI-01': ['FDE-01', 'AI-02', 'AI-03'],
  'AI-02': ['AI-01', 'AI-03', 'FDE-01'],
  'AI-03': ['AI-01', 'AI-02', 'FDE-01'],
  'ALG-01': ['FDE-01'],
  'ALG-02': ['ALG-01', 'FDE-01'],
}

const topicHits = new Map<string, string[]>()

function topicsInFdeLesson(source: string): string[] {
  const hits: string[] = []
  if (source.includes('幻觉')) hits.push('AI-01')
  if (source.includes('检索增强') || /\bRAG\b/.test(source)) hits.push('AI-02')
  if (source.includes('工具调用') || source.includes('函数调用')) hits.push('AI-03')
  return hits
}

function extractSections(html: string): SectionHeading[] {
  const sections: SectionHeading[] = []
  const pattern = /<h2 id="([^"]*)"><span class="block-index"[^>]*>([^<]+)<\/span>([^<]*)<\/h2>/g
  for (const match of html.matchAll(pattern)) {
    sections.push({
      id: match[1] ?? '',
      index: (match[2] ?? '').trim(),
      title: (match[3] ?? '').trim(),
    })
  }
  return sections
}

function wantsToc(track: TrackId, count: number): boolean {
  if (track === 'fde') return count >= 8
  return count >= 6
}

function loadTrack(id: TrackId): Track {
  const meta = TRACK_META[id]
  const dir = join(NOTES_ROOT, meta.dir)
  const readme = readText(join(dir, 'README.md'))
  const english = join(dir, 'README.en.md')
  readText(english)
  const { headers, rows } = firstTable(readme)
  if (rows.length === 0) throw new Error(`No inventory table in notes/${meta.dir}/README.md`)

  const lessons: Lesson[] = rows.map((row) => {
    const serial = column(headers, row, ['编号'])
    const linked = parseLinkCell(column(headers, row, ['标题', '笔记']))
    if (!serial || !linked.href) {
      throw new Error(`Inventory row in notes/${meta.dir} is missing a serial or file link`)
    }
    if (!serial.startsWith(PREFIX[id])) {
      throw new Error(`Serial ${serial} does not belong in ${id}`)
    }
    let filename = linked.href.split('/').pop() ?? ''
    try {
      filename = decodeURIComponent(filename)
    } catch {
      /* keep the raw basename */
    }
    const fromName = filename.match(/^(FDE|AI|ALG)-\d+/)
    if (!fromName || fromName[0] !== serial) {
      throw new Error(`Serial mismatch for ${filename}: table says ${serial}`)
    }
    const fullPath = join(dir, filename)
    const source = readText(fullPath)
    const doc = splitDocument(source)
    const metaLine = parseMetaLine(doc.metaLine)
    const date = prefer(column(headers, row, ['日期', '收录日期']), metaLine.date)
    if (id === 'fde') topicHits.set(serial, topicsInFdeLesson(source))
    const html = renderMarkdown(doc.body, { track: id })
    const sections = extractSections(html)
    const lesson: Lesson = {
      track: id,
      serial,
      title: linked.text,
      pageTitle: doc.pageTitle || linked.text,
      date,
      day: dayLabel(prefer(column(headers, row, ['Day']), metaLine.day)),
      theme: prefer(column(headers, row, ['主题板块', '主题', '分类']), metaLine.theme),
      difficulty: prefer(column(headers, row, ['难度']), metaLine.difficulty),
      term: prefer(column(headers, row, ['术语']), null),
      interviewFrequency: prefer(column(headers, row, ['面试频率']), metaLine.interviewFrequency),
      scenario: prefer(column(headers, row, ['适用场景']), null),
      filename,
      githubUrl: githubBlob(`notes/${meta.dir}/${filename}`),
      href: sitePath(`/${id}/${serial}`),
      description: clip(firstParagraph(doc.body) || doc.pageTitle || linked.text),
      html,
      sections,
      showToc: wantsToc(id, sections.length),
      related: [],
      prev: null,
      next: null,
    }
    return lesson
  })

  lessons.forEach((lesson, index) => {
    const prev = lessons[index - 1]
    const next = lessons[index + 1]
    lesson.prev = prev ? { serial: prev.serial, title: prev.title, href: prev.href } : null
    lesson.next = next ? { serial: next.serial, title: next.title, href: next.href } : null
  })

  return {
    id,
    index: meta.index,
    name: meta.name,
    shortName: meta.shortName,
    navLabel: meta.navLabel,
    promise: meta.promise,
    lede: readLede(readme),
    href: sitePath(`/${id}`),
    enHref: githubBlob(`notes/${meta.dir}/README.en.md`),
    count: lessons.length,
    rangeLabel: rangeLabel(lessons),
    lessons,
  }
}

let cache: Track[] | null = null

function attachRelated(tracks: Track[]) {
  const bySerial = new Map(tracks.flatMap((track) => track.lessons).map((lesson) => [lesson.serial, lesson]))
  for (const track of tracks) {
    for (const lesson of track.lessons) {
      const serials = [...(CURATED_RELATED[lesson.serial] ?? []), ...(topicHits.get(lesson.serial) ?? [])]
      const seen = new Set<string>()
      lesson.related = []
      for (const serial of serials) {
        if (serial === lesson.serial || seen.has(serial)) continue
        const target = bySerial.get(serial)
        if (!target) continue
        seen.add(serial)
        lesson.related.push({ serial: target.serial, title: target.title, href: target.href })
      }
    }
  }
}

export function loadTracks(): Track[] {
  if (!cache) {
    assertPromises()
    const tracks = (['fde', 'ai', 'algorithms'] as const).map(loadTrack)
    attachRelated(tracks)
    cache = tracks
  }
  return cache
}

export function getTrack(id: TrackId): Track {
  const track = loadTracks().find((item) => item.id === id)
  if (!track) throw new Error(`Unknown track ${id}`)
  return track
}

export function allLessons(): Lesson[] {
  return loadTracks().flatMap((track) => track.lessons)
}

function serialNumber(serial: string): number {
  return Number(serial.split('-')[1] ?? 0)
}

export function latestLessons(limit = 6): Lesson[] {
  return allLessons()
    .slice()
    .sort((a, b) => {
      const dateA = a.date ?? '0000-00-00'
      const dateB = b.date ?? '0000-00-00'
      if (dateA !== dateB) return dateB.localeCompare(dateA)
      return serialNumber(b.serial) - serialNumber(a.serial)
    })
    .slice(0, limit)
}

export function trackOf(id: TrackId): Track {
  return getTrack(id)
}
