import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { sections } from './sections'

describe('App shell', () => {
  it('renders every section anchor in order once the sections have loaded', async () => {
    const { container } = render(<App />)
    await waitFor(
      () => {
        const ids = Array.from(container.querySelectorAll('main > section')).map((el) => el.id)
        expect(ids).toEqual(sections.map((s) => s.id))
      },
      { timeout: 8000 },
    )
  }, 10000)

  it('keeps an anchor for every section while sections are still loading', () => {
    const { container } = render(<App />)
    const ids = Array.from(container.querySelectorAll('main > section, main > div[id]')).map((el) => el.id)
    expect(ids).toEqual(sections.map((s) => s.id))
  })

  it('scrolls to the section named in the URL hash once it has loaded', async () => {
    window.location.hash = '#skills'
    const scrollIntoView = Element.prototype.scrollIntoView as ReturnType<typeof vi.fn>
    scrollIntoView.mockClear()
    render(<App />)
    await waitFor(
      () => {
        const targets = scrollIntoView.mock.contexts.map((el) => (el as HTMLElement).id)
        expect(targets).toContain('skills')
        expect((document.getElementById('skills') as HTMLElement).tagName).toBe('SECTION')
      },
      { timeout: 8000 },
    )
    window.location.hash = ''
  }, 10000)

  it('has a skip link as the first focusable element', async () => {
    render(<App />)
    await userEvent.tab()
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveFocus()
  })

  it('exposes landmarks', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})

describe('mobile menu', () => {
  it('toggles, and closes on link selection and Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toHaveAttribute('data-open', 'true')
    await user.click(within(nav).getByRole('link', { name: 'Projects' }))
    expect(nav).toHaveAttribute('data-open', 'false')

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.keyboard('{Escape}')
    expect(nav).toHaveAttribute('data-open', 'false')
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveFocus()
  })
})
