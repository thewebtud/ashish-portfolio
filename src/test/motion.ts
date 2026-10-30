import { vi } from 'vitest'

/** Makes `(prefers-reduced-motion: reduce)` match (or not) for the current test. */
export function mockReducedMotion(reduce: boolean) {
  const original = window.matchMedia
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduce : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
  return () => {
    window.matchMedia = original
  }
}

export { vi }
