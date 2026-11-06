import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url)
const root = dist.pathname

function read(relative) {
  return readFileSync(join(root, relative), 'utf8')
}

function exists(relative) {
  try {
    statSync(join(root, relative))
    return true
  } catch {
    return false
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const home = read('index.html')
const fde = read('fde/index.html')
const ai = read('ai/index.html')
const alg = read('algorithms/index.html')
const notes = read('notes/index.html')
const fde01 = read('fde/FDE-01/index.html')
const ai01 = read('ai/AI-01/index.html')
const alg01 = read('algorithms/ALG-01/index.html')
const fde05 = read('fde/FDE-05/index.html')
const notFound = read('404.html')

assert(home.includes('Knowledge Base'), 'home title missing')
assert(!home.includes('前线课'), 'old site name should be gone')
assert(!home.includes('最近更新'), 'homepage should not list recent lessons')
assert(!home.includes('香港'), 'homepage chrome should not say 香港')
assert(!home.includes('招聘要考的内容为主'), 'homepage should not repeat the syllabus paragraph')
assert(!home.includes('data-progress') && !home.includes('data-continue') && !home.includes('0/5'), 'homepage should not show progress')
assert(home.includes('/knowledge-base/fde/'), 'home missing fde link')
assert(home.includes('/knowledge-base/ai/'), 'home missing ai link')
assert(home.includes('/knowledge-base/algorithms/'), 'home missing algorithms link')
assert(home.includes('三条路径'), 'homepage path section missing')
assert(home.includes('岗位 · 科普 · 算法'), 'home supporting line missing')

for (const serial of ['FDE-01', 'FDE-02', 'FDE-03', 'FDE-04', 'FDE-05']) {
  assert(fde.includes(`/knowledge-base/fde/${serial}/`), `fde index missing ${serial}`)
  assert(exists(`fde/${serial}/index.html`), `missing page ${serial}`)
}
for (const serial of ['AI-01', 'AI-02', 'AI-03']) {
  assert(ai.includes(`/knowledge-base/ai/${serial}/`), `ai index missing ${serial}`)
}
assert(alg.includes('/knowledge-base/algorithms/ALG-01/'), 'alg index missing ALG-01')
assert(fde.includes('英文索引'), 'english index link missing')
assert(!fde.includes('按日期读'), 'track index should not repeat the lesson introduction')
assert(!fde.includes('data-progress') && !fde.includes('0/5'), 'track index should not show progress')
assert(notes.includes('只留在这台浏览器'), 'notes disclosure missing')
assert(notes.includes('还没有写下反思'), 'notes empty state missing')
assert(notes.includes('Knowledge Base'), 'notes title missing')
assert(!notes.includes('前线课'), 'notes page should not use the old name')
assert(notes.includes('/knowledge-base/notes/'), 'notes canonical missing')

assert(fde01.includes('<summary>参考答案</summary>'), 'answer summary missing')
assert(fde01.includes('class="block"'), 'lesson sections should be separated blocks')
assert(fde01.includes('block-index'), 'section index missing')
assert(!fde01.includes('标记已学完'), 'done control should be gone')
assert(!fde01.includes('前线课'), 'lesson chrome should not use the old name')
assert(fde01.includes('data-reflect'), 'reflection panel missing')
assert(fde01.includes('今天记住的一点'), 'reflection prompt missing')
assert(ai01.includes('class="block"') && alg01.includes('class="block"'), 'every series should use section blocks')
assert(!/<details[^>]*\sopen[\s=>]/i.test(fde01), 'answers should stay collapsed')
assert(fde01.includes('现场交付与成功标准'), 'FDE-01 title missing')
assert(fde01.includes('<h3'), 'markdown inside details was not rendered')
assert(!fde01.includes('### 小练习'), 'raw heading leaked out of details')
assert(fde01.includes('/knowledge-base/fde/FDE-02/'), 'FDE-01 next missing')
assert(!fde01.includes('pager-prev'), 'FDE-01 should not have a previous lesson')
assert(fde01.includes('在 GitHub 上查看源文'), 'source link missing')
assert(fde01.includes('blob/main/notes/hk-fde/FDE-01-'), 'github source path missing')
assert(!fde01.includes('README.md'), 'relative readme link was not rewritten')
assert(!fde01.includes('<iframe'), 'unexpected iframe')

assert(fde05.includes('pager-prev') && fde05.includes('/knowledge-base/fde/FDE-04/'), 'FDE-05 prev missing')
assert(!fde05.includes('pager-next'), 'FDE-05 should not have a next lesson')
assert(fde05.includes('/knowledge-base/fde/'), 'series index link missing')
assert(fde05.includes('youtube.com/watch?v=5OYy_UtINo4'), 'FDE-05 youtube link missing')
assert(fde05.includes('target="_blank"'), 'external links should open in a new tab')

assert(ai01.includes('AI 幻觉'), 'AI-01 title missing')
assert(ai01.includes('<summary>参考答案</summary>'), 'AI-01 answers missing')
assert(ai01.includes('Hallucination') || ai01.includes('幻觉'), 'AI-01 theme missing')

assert(alg01.includes('class="katex"'), 'KaTeX did not render')
assert(alg01.includes('katex-display'), 'display math missing')
assert(!alg01.includes('$$'), 'raw display math leaked')
assert(alg01.includes('youtube.com/watch?v=nk2CQITm_eo'), 'ALG-01 youtube link missing')
assert(!alg01.includes('/algorithms/ALG-02'), 'preview of ALG-02 must not become a link')
assert(alg01.includes('/knowledge-base/algorithms/'), 'ALG index link missing')
assert(alg01.includes('<summary>参考答案</summary>'), 'ALG answers missing')

assert(notFound.includes('这一页不在课程里'), '404 copy missing')
assert(notFound.includes('/knowledge-base/'), '404 home link missing')
assert(notFound.includes('noindex'), '404 should be noindex')

const banned = ['DJI', 'CodeBuddy', 'Marvis', '马维斯', '腾讯']
const files = [home, fde, ai, alg, fde01, ai01, alg01, notFound]
for (const word of banned) {
  for (const html of files) {
    assert(!html.includes(word), `unexpected brand string: ${word}`)
  }
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) walk(path, acc)
    else acc.push(path)
  }
  return acc
}

const css = walk(root).filter((file) => file.endsWith('.css')).map((file) => readFileSync(file, 'utf8')).join('\n')
assert(css.includes('.katex'), 'KaTeX stylesheet was not bundled')
assert(/Inter/i.test(css), 'Inter was not bundled')

console.log('verify-dist: html, math, answers, and links ok')
