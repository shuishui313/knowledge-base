const DONE_KEY = 'qxk:v1:done'
const LAST_KEY = 'qxk:v1:last'
const NOTES_KEY = 'qxk:v1:notes'

type DoneMap = Record<string, number>
type NoteMap = Record<string, string>

interface CatalogItem {
  serial: string
  title: string
  track: string
  trackName: string
  href: string
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as T
    return parsed && typeof parsed === 'object' ? parsed : fallback
  } catch {
    return fallback
  }
}

function doneMap(): DoneMap {
  return readJson<DoneMap>(DONE_KEY, {})
}

function noteMap(): NoteMap {
  return readJson<NoteMap>(NOTES_KEY, {})
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function serialsOf(el: Element): string[] {
  return (el.getAttribute('data-serials') || '').split(/\s+/).filter(Boolean)
}

function trackPath(serial: string): string {
  if (serial.startsWith('ALG')) return 'algorithms'
  if (serial.startsWith('AI')) return 'ai'
  return 'fde'
}

function hrefFor(serial: string): string {
  const base = document.body.dataset.base || '/knowledge-base/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}${trackPath(serial)}/${serial}/`
}

function order(): string[] {
  return (document.body.dataset.order || '').split(/\s+/).filter(Boolean)
}

function paintPreviews() {
  const done = doneMap()
  document.querySelectorAll<HTMLElement>('[data-preview]').forEach((el) => {
    const list = serialsOf(el)
    const next = list.find((serial) => !done[serial])
    el.textContent = next ? `下一篇 · ${next}` : '已完成'
  })
}

function paintProgress() {
  const done = doneMap()
  document.querySelectorAll<HTMLElement>('[data-serials]').forEach((el) => {
    const list = serialsOf(el)
    if (!list.length) return
    const total = Number(el.dataset.total || list.length)
    const count = list.filter((serial) => done[serial]).length
    if (el.hasAttribute('data-progress')) {
      el.textContent = `${count}/${total}`
      el.setAttribute('aria-label', `已学完 ${count}，共 ${total}`)
    }
    if (el.hasAttribute('data-meter')) {
      const ratio = total > 0 ? Math.round((count / total) * 100) : 0
      el.style.setProperty('--p', String(ratio))
    }
  })
  paintPreviews()

  document.querySelectorAll<HTMLElement>('[data-done-flag]').forEach((flag) => {
    const serial = flag.dataset.doneFlag || ''
    const on = Boolean(done[serial])
    flag.hidden = !on
    flag.closest('.lesson-card')?.classList.toggle('is-done', on)
  })
}

function paintToggle(button: HTMLButtonElement) {
  const serial = button.dataset.doneToggle || ''
  const on = Boolean(doneMap()[serial])
  button.hidden = false
  button.setAttribute('aria-pressed', on ? 'true' : 'false')
  button.textContent = on ? '已学完' : '标记已学完'
}

function wireToggles() {
  document.querySelectorAll<HTMLButtonElement>('[data-done-toggle]').forEach((button) => {
    paintToggle(button)
    button.addEventListener('click', () => {
      const serial = button.dataset.doneToggle || ''
      if (!serial) return
      const done = doneMap()
      if (done[serial]) delete done[serial]
      else done[serial] = Date.now()
      writeJson(DONE_KEY, done)
      paintToggle(button)
      paintProgress()
    })
  })
}

function continueTarget(): string | null {
  const done = doneMap()
  const list = order()
  const last = localStorage.getItem(LAST_KEY)
  const started = Boolean(last) || Object.keys(done).length > 0
  if (!started) return null
  if (last && list.includes(last) && !done[last]) return last
  return list.find((serial) => !done[serial]) ?? null
}

function wireContinue() {
  const slot = document.querySelector<HTMLElement>('[data-continue]')
  if (!slot) return
  const serial = continueTarget()
  if (!serial) return
  const link = document.createElement('a')
  link.href = hrefFor(serial)
  link.textContent = `继续学习 · ${serial}`
  slot.replaceChildren(link)
  slot.hidden = false
}

function wireReflect() {
  const panel = document.querySelector<HTMLElement>('[data-reflect]')
  if (!panel) return
  const serial = panel.dataset.reflect || ''
  const field = panel.querySelector('textarea')
  if (!serial || !field) return
  field.value = noteMap()[serial] || ''
  panel.hidden = false
  let timer = 0
  const save = () => {
    const notes = noteMap()
    const text = field.value
    if (text.trim()) notes[serial] = text
    else delete notes[serial]
    writeJson(NOTES_KEY, notes)
  }
  field.addEventListener('input', () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(save, 300)
  })
  field.addEventListener('blur', save)
}

function catalog(): CatalogItem[] {
  const node = document.querySelector('#qxk-catalog')
  if (!node?.textContent) return []
  try {
    const parsed = JSON.parse(node.textContent) as CatalogItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function markdownFor(items: CatalogItem[], notes: NoteMap): string {
  const lines = ['# 前线课', '']
  for (const track of ['fde', 'ai', 'algorithms']) {
    const group = items.filter((item) => item.track === track && notes[item.serial]?.trim())
    if (!group.length) continue
    lines.push(`## ${group[0]?.trackName || track}`, '')
    for (const item of group) {
      lines.push(`### ${item.serial} ${item.title}`, '', notes[item.serial] || '', '')
    }
  }
  return lines.join('\n')
}

function wireNotes() {
  const root = document.querySelector<HTMLElement>('[data-notes-root]')
  if (!root) return
  const notes = noteMap()
  const items = catalog()
  const saved = items.filter((item) => notes[item.serial]?.trim())
  const empty = document.querySelector<HTMLElement>('[data-notes-empty]')
  const exportButton = document.querySelector<HTMLButtonElement>('[data-export]')
  if (!saved.length) return
  if (empty) empty.hidden = true

  const tracks = ['fde', 'ai', 'algorithms']
  for (const track of tracks) {
    const group = saved.filter((item) => item.track === track)
    if (!group.length) continue
    const section = document.createElement('section')
    section.className = 'note-group'
    const heading = document.createElement('h2')
    heading.textContent = group[0]?.trackName || track
    section.append(heading)
    for (const item of group) {
      const card = document.createElement('article')
      card.className = 'note-card'
      const title = document.createElement('a')
      title.href = item.href
      const serial = document.createElement('span')
      serial.className = 'note-serial'
      serial.textContent = item.serial
      const name = document.createElement('span')
      name.textContent = item.title
      title.append(serial, name)
      const body = document.createElement('p')
      body.className = 'note-body'
      body.textContent = notes[item.serial] || ''
      card.append(title, body)
      section.append(card)
    }
    root.append(section)
  }

  if (exportButton) {
    exportButton.hidden = false
    exportButton.addEventListener('click', () => {
      const blob = new Blob([markdownFor(items, noteMap())], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = '前线课-反思.md'
      link.click()
      URL.revokeObjectURL(url)
    })
  }
}

function rememberLesson() {
  const serial = document.body.dataset.lesson
  if (!serial) return
  localStorage.setItem(LAST_KEY, serial)
}

function wireLight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const hero = document.querySelector<HTMLElement>('.home-hero')
  if (!hero) return
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    hero.style.setProperty('--lx', `${x}%`)
    hero.style.setProperty('--ly', `${y}%`)
  })
}

export function boot() {
  try {
    rememberLesson()
    wireToggles()
    wireReflect()
    wireNotes()
    wireContinue()
    wireLight()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) paintProgress()
    else requestAnimationFrame(() => requestAnimationFrame(() => paintProgress()))
  } catch {
    /* private mode and blocked storage leave the pages readable */
  }
}
