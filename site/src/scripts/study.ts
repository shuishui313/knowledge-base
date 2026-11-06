const NOTES_KEY = 'qxk:v1:notes'

type NoteMap = Record<string, string>

interface CatalogItem {
  serial: string
  title: string
  track: string
  trackName: string
  href: string
}

function readNotes(): NoteMap {
  try {
    const raw = localStorage.getItem(NOTES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as NoteMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeNotes(notes: NoteMap) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
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
  const lines = ['# Knowledge Base', '']
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

function wireReflect() {
  const panel = document.querySelector<HTMLElement>('[data-reflect]')
  if (!panel) return
  const serial = panel.dataset.reflect || ''
  const field = panel.querySelector('textarea')
  if (!serial || !field) return
  field.value = readNotes()[serial] || ''
  panel.hidden = false
  let timer = 0
  const save = () => {
    const notes = readNotes()
    const text = field.value
    if (text.trim()) notes[serial] = text
    else delete notes[serial]
    writeNotes(notes)
  }
  field.addEventListener('input', () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(save, 300)
  })
  field.addEventListener('blur', save)
}

function wireNotes() {
  const root = document.querySelector<HTMLElement>('[data-notes-root]')
  if (!root) return
  const notes = readNotes()
  const items = catalog()
  const saved = items.filter((item) => notes[item.serial]?.trim())
  const empty = document.querySelector<HTMLElement>('[data-notes-empty]')
  const exportButton = document.querySelector<HTMLButtonElement>('[data-export]')
  if (!saved.length) return
  if (empty) empty.hidden = true

  for (const track of ['fde', 'ai', 'algorithms']) {
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
      name.className = 'note-title'
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
      const blob = new Blob([markdownFor(items, readNotes())], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'knowledge-base-notes.md'
      link.click()
      URL.revokeObjectURL(url)
    })
  }
}

export function boot() {
  try {
    wireReflect()
    wireNotes()
  } catch {
    /* storage can be blocked; the lesson still reads */
  }
}
