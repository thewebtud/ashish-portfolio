import { afterEach, beforeEach, vi } from 'vitest'

export interface MatchMediaControl {
  setLight: (light: boolean) => void
  setReducedMotion: (reduce: boolean) => void
  restore: () => void
}

/** Controllable matchMedia for colour-scheme and reduced-motion queries. */
export function mockMatchMedia(initial: { light?: boolean; reduced?: boolean } = {}): MatchMediaControl {
  const original = window.matchMedia
  const state = { light: initial.light ?? false, reduced: initial.reduced ?? false }
  const listeners: Record<string, Set<() => void>> = {}

  const value = (query: string) => (query.includes('prefers-color-scheme: light') ? state.light : query.includes('prefers-reduced-motion') ? state.reduced : false)

  window.matchMedia = ((query: string) => {
    listeners[query] ??= new Set()
    return {
      get matches() {
        return value(query)
      },
      media: query,
      onchange: null,
      addEventListener: (_: string, cb: () => void) => listeners[query].add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners[query].delete(cb),
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }
  }) as unknown as typeof window.matchMedia

  const fire = (needle: string) =>
    Object.entries(listeners).forEach(([query, set]) => query.includes(needle) && set.forEach((cb) => cb()))

  return {
    setLight(light) {
      state.light = light
      fire('prefers-color-scheme')
    },
    setReducedMotion(reduce) {
      state.reduced = reduce
      fire('prefers-reduced-motion')
    },
    restore() {
      window.matchMedia = original
    },
  }
}

/** Resets the theme DOM state and storage around each test. */
export function resetThemeEnvironment() {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('theme-transition')
    document.head.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove())
  })
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })
}
