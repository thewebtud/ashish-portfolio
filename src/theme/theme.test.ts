import { act } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockMatchMedia, resetThemeEnvironment, type MatchMediaControl } from '../test/theme'
import {
  getTheme,
  initTheme,
  readStoredTheme,
  setTheme,
  subscribeToTheme,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  toggleTheme,
} from './theme'

resetThemeEnvironment()

let media: MatchMediaControl | undefined
afterEach(() => {
  media?.restore()
  media = undefined
})

const start = (opts: { light?: boolean; reduced?: boolean } = {}) => {
  media = mockMatchMedia(opts)
  initTheme()
}

const meta = () => document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')

describe('initial theme', () => {
  it('uses dark by default', () => {
    start()
    expect(getTheme()).toBe('dark')
  })

  it('uses dark even when the system prefers light', () => {
    start({ light: true })
    expect(getTheme()).toBe('dark')
  })

  it('uses a stored light choice even when the system prefers dark', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light')
    start()
    expect(getTheme()).toBe('light')
  })

  it('prefers a stored choice over the system preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    start({ light: true })
    expect(getTheme()).toBe('dark')
  })

  it('ignores an invalid stored value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia')
    expect(readStoredTheme()).toBeNull()
    start({ light: true })
    expect(getTheme()).toBe('dark')
  })

  it('keeps the theme set before first paint by the inline script', () => {
    document.documentElement.dataset.theme = 'light'
    start()
    expect(getTheme()).toBe('light')
  })

  it('works when matchMedia is unavailable', () => {
    const original = window.matchMedia
    // @ts-expect-error simulate an environment without matchMedia
    window.matchMedia = undefined
    initTheme()
    expect(getTheme()).toBe('dark')
    window.matchMedia = original
  })
})

describe('toggling', () => {
  it('switches between dark and light and stores the choice', () => {
    start()
    toggleTheme()
    expect(getTheme()).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    toggleTheme()
    expect(getTheme()).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('updates the theme-color meta', () => {
    start()
    expect(meta()?.content).toBe(THEME_COLORS.dark)
    setTheme('light')
    expect(meta()?.content).toBe(THEME_COLORS.light)
  })

  it('notifies subscribers once per change', () => {
    start()
    const listener = vi.fn()
    const unsubscribe = subscribeToTheme(listener)
    setTheme('light')
    setTheme('light')
    expect(listener).toHaveBeenCalledTimes(1)
    unsubscribe()
    setTheme('dark')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('still switches for the page view when storage throws', () => {
    start()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => toggleTheme()).not.toThrow()
    expect(getTheme()).toBe('light')
  })

  it('falls back to dark when reading storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    start({ light: true })
    expect(getTheme()).toBe('dark')
  })
})

describe('system preference changes', () => {
  it('never changes the theme', () => {
    start()
    act(() => media!.setLight(true))
    expect(getTheme()).toBe('dark')
  })
})

describe('transition', () => {
  it('adds the transition class briefly when switching', () => {
    vi.useFakeTimers()
    start()
    toggleTheme()
    expect(document.documentElement).toHaveClass('theme-transition')
    vi.advanceTimersByTime(300)
    expect(document.documentElement).not.toHaveClass('theme-transition')
  })

  it('does not add the transition class under reduced motion', () => {
    start({ reduced: true })
    toggleTheme()
    expect(document.documentElement).not.toHaveClass('theme-transition')
    expect(getTheme()).toBe('light')
  })
})
