export type TrackId = 'fde' | 'ai' | 'algorithms'

export const REPO = 'shuishui313/knowledge-base'
export const SITE_ORIGIN = 'https://shuishui313.github.io'
export const SITE_NAME = '香港 FDE 学习'

export function sitePath(pathname: string): string {
  const raw = import.meta.env.BASE_URL || '/knowledge-base/'
  const base = raw.endsWith('/') ? raw : `${raw}/`
  const clean = pathname.replace(/^\/+|\/+$/g, '')
  return clean ? `${base}${clean}/` : base
}

export function githubBlob(repoPath: string): string {
  const encoded = repoPath
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `https://github.com/${REPO}/blob/main/${encoded}`
}

export function absoluteUrl(pathname: string): string {
  return new URL(sitePath(pathname), SITE_ORIGIN).href
}
