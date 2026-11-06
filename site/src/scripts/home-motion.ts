function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function bindInstrument(hero: HTMLElement, instrument: HTMLElement) {
  let frame = 0
  const update = () => {
    frame = 0
    const rect = hero.getBoundingClientRect()
    const height = rect.height || 1
    const progress = Math.min(1, Math.max(0, -rect.top / height))
    instrument.style.setProperty('--recede', `${(progress * 72).toFixed(2)}px`)
    instrument.style.setProperty('--instrument-opacity', (1 - progress * 0.4).toFixed(3))
  }
  const onScroll = () => {
    if (frame) return
    frame = window.requestAnimationFrame(update)
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
}

function bindTracks(section: HTMLElement) {
  const reveal = () => section.classList.add('is-in')
  if (!('IntersectionObserver' in window)) {
    reveal()
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      reveal()
      observer.disconnect()
    },
    { threshold: 0.22, rootMargin: '0px 0px -6% 0px' },
  )
  observer.observe(section)
}

export function bootHome() {
  const hero = document.querySelector<HTMLElement>('.hero')
  const instrument = document.querySelector<HTMLElement>('.hero-instrument')
  const tracks = document.querySelector<HTMLElement>('#tracks')
  if (!hero || !instrument || !tracks || reducedMotion()) return
  document.documentElement.classList.add('home-motion')
  bindInstrument(hero, instrument)
  bindTracks(tracks)
}
