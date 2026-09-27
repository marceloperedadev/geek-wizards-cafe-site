export function isValidImageUrl(value: unknown): value is string | null {
  if (value === null || value === '') return true
  if (typeof value !== 'string' || value.length > 2048 || value.includes('\\')) return false
  try {
    const localUrl = new URL(value, 'https://catalog.local')
    if (localUrl.origin === 'https://catalog.local') {
      return (
        localUrl.pathname.startsWith('/images/') &&
        !decodeURIComponent(localUrl.pathname).split('/').includes('..')
      )
    }
    return localUrl.protocol === 'https:' && !localUrl.username && !localUrl.password
  } catch {
    return false
  }
}
