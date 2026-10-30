import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockMatchMedia, resetThemeEnvironment, type MatchMediaControl } from '../test/theme'
import { getTheme, initTheme, THEME_STORAGE_KEY } from '../theme/theme'
import { NavBar } from './NavBar'
import { ThemeToggle } from './ThemeToggle'

resetThemeEnvironment()

let media: MatchMediaControl | undefined
let cleanup: (() => void) | undefined
afterEach(() => {
  cleanup?.()
  media?.restore()
  cleanup = undefined
  media = undefined
})

const start = (opts: { light?: boolean; reduced?: boolean } = {}) => {
  media = mockMatchMedia(opts)
  cleanup = initTheme()
}

describe('ThemeToggle', () => {
  it('names the action and shows the sun icon while in dark theme', () => {
    start()
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: 'Switch to light theme' })
    expect(button).toHaveAttribute('data-theme-toggle', 'dark')
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('names the action and flips the icon while in light theme', () => {
    start({ light: true })
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toHaveAttribute('data-theme-toggle', 'light')
  })

  it('switches the whole document theme on click and back again', async () => {
    const user = userEvent.setup()
    start()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('is operable with Enter and Space and keeps focus', async () => {
    const user = userEvent.setup()
    start()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    button.focus()

    await user.keyboard('{Enter}')
    expect(getTheme()).toBe('light')
    expect(screen.getByRole('button')).toHaveFocus()

    await user.keyboard(' ')
    expect(getTheme()).toBe('dark')
    expect(screen.getByRole('button')).toHaveFocus()
  })
})

describe('persistence', () => {
  it('stores the choice and restores it after a remount', async () => {
    const user = userEvent.setup()
    start()
    const first = render(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')

    first.unmount()
    cleanup?.()
    document.documentElement.removeAttribute('data-theme') // simulates a fresh page load before the inline script
    start()
    render(<ThemeToggle />)
    expect(getTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })

  it('keeps an explicit dark choice even when the system prefers light', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    start({ light: true })
    render(<ThemeToggle />)
    expect(getTheme()).toBe('dark')
  })

  it('still switches for the page view when storage throws', async () => {
    const user = userEvent.setup()
    start()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(getTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })
})

describe('NavBar placement', () => {
  it('renders the toggle in the top bar next to the menu button, outside the collapsible nav', () => {
    start()
    render(<NavBar />)
    const toggle = screen.getByRole('button', { name: /switch to (light|dark) theme/i })
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(nav).queryByRole('button', { name: /switch to/i })).toBeNull()
    expect(toggle.parentElement).toBe(screen.getByRole('button', { name: /open menu/i }).parentElement)
  })
})
