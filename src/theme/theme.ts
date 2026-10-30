export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'
// Keep in sync with --color-bg in tokens.css and the inline script in index.html
export const THEME_COLORS: Record<Theme, string> = { dark: '#060a14', light: '#f6f8fc' }
const TRANSITION_CLASS = 'theme-transition'
const TRANSITION_MS = 250

const listeners = new Set<() => void>()
let transitionTimer: ReturnType<typeof setTimeout> | undefined

export const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark'

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only
  }
}

export function getSystemTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme()
}

/** The `data-theme` attribute on <html> is the single source of truth. */
export function getTheme(): Theme {
  const value = document.documentElement.dataset.theme
  return isTheme(value) ? value : 'dark'
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

function updateThemeColorMeta(theme: Theme) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }
  meta.content = THEME_COLORS[theme]
}

function runTransition() {
  if (prefersReducedMotion()) return
  const root = document.documentElement
  root.classList.add(TRANSITION_CLASS)
  clearTimeout(transitionTimer)
  transitionTimer = setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS)
}

function apply(theme: Theme, animate: boolean) {
  if (document.documentElement.dataset.theme === theme) return
  if (animate) runTransition()
  document.documentElement.dataset.theme = theme
  updateThemeColorMeta(theme)
  listeners.forEach((listener) => listener())
}

/** Explicit choice: applied now and remembered. */
export function setTheme(theme: Theme) {
  writeStoredTheme(theme)
  apply(theme, true)
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

export function subscribeToTheme(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * Syncs the DOM with the resolved theme (the inline script in index.html normally did this
 * already) and follows system changes while no explicit choice is stored.
 */
export function initTheme(): () => void {
  const current = document.documentElement.dataset.theme
  apply(isTheme(current) ? current : resolveInitialTheme(), false)
  updateThemeColorMeta(getTheme())

  let mql: MediaQueryList | undefined
  const onSystemChange = () => {
    if (readStoredTheme() === null) apply(getSystemTheme(), true)
  }
  try {
    mql = window.matchMedia('(prefers-color-scheme: light)')
    mql.addEventListener('change', onSystemChange)
  } catch {
    // matchMedia unavailable: keep the current theme
  }
  return () => mql?.removeEventListener('change', onSystemChange)
}
