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

for (const serial of ['FDE-01', 'FDE-02', 'FDE-03', 'FDE-04', 'FDE-05', 'FDE-06']) {
  assert(fde.includes(`/knowledge-base/fde/${serial}/`), `fde index missing ${serial}`)
  assert(exists(`fde/${serial}/index.html`), `missing page ${serial}`)
}
for (const serial of ['AI-01', 'AI-02', 'AI-03']) {
  assert(ai.includes(`/knowledge-base/ai/${serial}/`), `ai index missing ${serial}`)
}
assert(alg.includes('/knowledge-base/algorithms/ALG-01/'), 'alg index missing ALG-01')
assert(fde.includes('英文索引'), 'english index link missing')
assert(!/\d{4}-\d{2}-\d{2}/.test(fde), 'FDE catalog should not show calendar dates')
assert(!/\d{4}-\d{2}-\d{2}/.test(ai), 'AI catalog should not show calendar dates')
assert(!/\d{4}-\d{2}-\d{2}/.test(alg), 'algorithm catalog should not show calendar dates')
assert(fde.includes('Day 1') && fde.includes('入门'), 'FDE cards should keep day and level')
const fde01Head = fde01.slice(fde01.indexOf('lesson-head'), fde01.indexOf('class="prose"'))
assert(!/\d{4}-\d{2}-\d{2}/.test(fde01Head), 'FDE-01 chips should not include a calendar date')
assert(fde01Head.includes('Day 1') && fde01Head.includes('入门') && fde01Head.includes('岗位本身'), 'FDE-01 should keep day, level, and theme')
const ai01Head = ai01.slice(ai01.indexOf('lesson-head'), ai01.indexOf('class="prose"'))
assert(!/\d{4}-\d{2}-\d{2}/.test(ai01Head), 'AI-01 chips should not include a calendar date')
const alg01Head = alg01.slice(alg01.indexOf('lesson-head'), alg01.indexOf('class="prose"'))
assert(!/\d{4}-\d{2}-\d{2}/.test(alg01Head), 'ALG-01 chips should not include a calendar date')
assert(alg01Head.includes('面试频率'), 'ALG-01 should keep the interview-frequency line')
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
assert(fde01.includes('>保存<'), 'save button missing')
assert(fde01.includes('已保存'), 'save confirmation missing')
assert(fde01.includes('查看笔记'), 'notes link missing')
assert(fde01.includes('/knowledge-base/notes/'), 'notes link should use the site base path')
assert(fde01.includes('今天记住的一点'), 'reflection prompt missing')
assert(ai01.includes('class="block"') && alg01.includes('class="block"'), 'every series should use section blocks')
const ai02 = read('ai/AI-02/index.html')
assert(/block-index[^<]*<\/span>定义/.test(ai02), 'AI-02 should show the index plus 定义')
assert(!/<h2[^>]*>[\s\S]*?[一二三四五六七八九十]、/.test(ai02), 'Chinese numeral prefixes should be stripped from headings')
assert(ai02.includes('class="toc"'), 'long AI lesson should have a directory')
assert(ai02.includes('相关课文'), 'AI-02 related lessons missing')
assert(ai02.includes('/knowledge-base/fde/FDE-01/'), 'AI-02 should link back to FDE-01')
assert(ai02.includes('FDE 是什么'), 'related link should use a visible title')
assert(alg01.includes('block-index'), 'algorithm lessons should use the same section index')
assert(alg01.includes('相关课文'), 'ALG-01 related lessons missing')
assert(!fde01.includes('class="toc"'), 'short FDE lessons should not get a directory')
assert(!/<details[^>]*\sopen[\s=>]/i.test(fde01), 'answers should stay collapsed')
assert(fde01.includes('FDE 是什么'), 'FDE-01 title missing')
assert(!fde01.includes('### '), 'raw heading leaked')
assert(fde01.includes('/knowledge-base/fde/FDE-02/'), 'FDE-01 next missing')
assert(!fde01.includes('pager-prev'), 'FDE-01 should not have a previous lesson')
assert(fde01.includes('在 GitHub 上查看源文'), 'source link missing')
assert(fde01.includes('blob/main/notes/hk-fde/FDE-01-'), 'github source path missing')
assert(!fde01.includes('README.md'), 'relative readme link was not rewritten')
assert(!fde01.includes('<iframe'), 'unexpected iframe')

assert(fde05.includes('pager-prev') && fde05.includes('/knowledge-base/fde/FDE-04/'), 'FDE-05 prev missing')
assert(fde05.includes('pager-next') && fde05.includes('/knowledge-base/fde/FDE-06/'), 'FDE-05 next missing')
assert(fde05.includes('/knowledge-base/fde/'), 'series index link missing')
const fde06 = read('fde/FDE-06/index.html')
assert(fde06.includes('pager-prev') && fde06.includes('/knowledge-base/fde/FDE-05/'), 'FDE-06 prev missing')
assert(fde06.includes('优先级与取舍'), 'FDE-06 title missing')
const fde03 = read('fde/FDE-03/index.html')
const ai03 = read('ai/AI-03/index.html')
assert(ai02.includes('<pre') && ai02.includes('资料 → 切块'), 'AI-02 pipeline block missing')
assert(ai03.includes('<pre') && ai03.includes('可用工具清单') && ai03.includes('get_claim_status') && ai03.includes('waiting_documents'), 'AI-03 code blocks missing')
assert(!fde03.includes('<iframe') && !fde05.includes('<iframe') && !ai02.includes('<iframe') && !ai03.includes('<iframe'), 'diagrams must not use iframes')
assert(ai02.includes('target="_blank"') || ai01.includes('target="_blank"'), 'external links should open in a new tab')

assert(ai01.includes('AI 幻觉'), 'AI-01 title missing')
assert(ai01.includes('<summary>参考答案</summary>'), 'AI-01 answers missing')
assert(ai01.includes('Hallucination') || ai01.includes('幻觉'), 'AI-01 theme missing')

assert(alg01.includes('class="katex"'), 'KaTeX did not render')
assert(alg01.includes('katex-display'), 'display math missing')
assert(!alg01.includes('$$'), 'raw display math leaked')
assert(alg01.includes('youtube.com/watch?v=nk2CQITm_eo'), 'ALG-01 youtube link missing')
assert(alg01.includes('/knowledge-base/algorithms/ALG-02/'), 'ALG-01 next to ALG-02 missing')
const alg02 = read('algorithms/ALG-02/index.html')
assert(alg02.includes('逻辑回归'), 'ALG-02 title missing')
assert(alg02.includes('class="katex"') && !alg02.includes('$$'), 'ALG-02 math did not render')
assert(alg02.includes('pager-prev') && alg02.includes('/knowledge-base/algorithms/ALG-01/'), 'ALG-02 prev missing')
assert(alg02.includes('/knowledge-base/algorithms/ALG-03/'), 'ALG-02 next to ALG-03 missing')
const alg03 = read('algorithms/ALG-03/index.html')
assert(alg03.includes('决策树'), 'ALG-03 title missing')
assert(alg03.includes('class="katex"') && !alg03.includes('$$'), 'ALG-03 math did not render')
assert(alg03.includes('pager-prev') && alg03.includes('/knowledge-base/algorithms/ALG-02/'), 'ALG-03 prev missing')
assert(alg03.includes('/knowledge-base/algorithms/ALG-04/'), 'ALG-03 next to ALG-04 missing')
const alg04 = read('algorithms/ALG-04/index.html')
assert(alg04.includes('K 近邻'), 'ALG-04 title missing')
assert(alg04.includes('class="katex"') && !alg04.includes('$$'), 'ALG-04 math did not render')
assert(alg04.includes('pager-prev') && alg04.includes('/knowledge-base/algorithms/ALG-03/'), 'ALG-04 prev missing')
assert(alg04.includes('/knowledge-base/algorithms/ALG-05/'), 'ALG-04 next to ALG-05 missing')
assert(alg04.includes('<summary>参考答案</summary>'), 'ALG-04 answers missing')
assert(alg04.includes('youtube.com/watch?v=HVXime0nQeI'), 'ALG-04 youtube link missing')
assert(alg.includes('/knowledge-base/algorithms/ALG-04/'), 'alg index missing ALG-04')
const alg05 = read('algorithms/ALG-05/index.html')
assert(alg05.includes('K-Means'), 'ALG-05 title missing')
assert(alg05.includes('class="katex"') && !alg05.includes('$$'), 'ALG-05 math did not render')
assert(alg05.includes('pager-prev') && alg05.includes('/knowledge-base/algorithms/ALG-04/'), 'ALG-05 prev missing')
assert(!alg05.includes('/algorithms/ALG-06'), 'preview of ALG-06 must not become a link')
assert(alg05.includes('<summary>参考答案</summary>'), 'ALG-05 answers missing')
assert(alg05.includes('youtube.com/watch?v=4b5d3muPQmA'), 'ALG-05 youtube link missing')
assert(alg.includes('/knowledge-base/algorithms/ALG-05/'), 'alg index missing ALG-05')
assert(alg03.includes('<summary>参考答案</summary>'), 'ALG-03 answers missing')
assert(alg03.includes('youtube.com/watch?v=_L39rN6gz7Y'), 'ALG-03 youtube link missing')
assert(alg.includes('/knowledge-base/algorithms/ALG-03/'), 'alg index missing ALG-03')
assert(alg02.includes('<summary>参考答案</summary>'), 'ALG-02 answers missing')
assert(alg02.includes('youtube.com/watch?v=yIYKR4sgzI8'), 'ALG-02 youtube link missing')
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
