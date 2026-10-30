import { act, render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import { mockReducedMotion } from '../test/motion'
import { Counter } from './Counter'
import { TypedText } from './TypedText'
import { Reveal } from '../components/Reveal'

let restore: (() => void) | undefined
afterEach(() => {
  restore?.()
  restore = undefined
  vi.useRealTimers()
})

describe('TypedText', () => {
  const items = ['React', 'TypeScript']

  it('types and cycles through every item', () => {
    vi.useFakeTimers()
    render(<TypedText items={items} typeSpeed={10} deleteSpeed={5} pause={20} />)
    const typed = screen.getByTestId('typed-text')
    expect(typed).toHaveTextContent('')

    for (let i = 0; i < 6; i++) {
      act(() => {
        vi.advanceTimersByTime(10)
      })
    }
    expect(typed).toHaveTextContent('React')

    for (let i = 0; i < 25; i++) {
      act(() => {
        vi.advanceTimersByTime(20)
      })
    }
    expect(typed.textContent).toMatch(/^T/)
  })

  it('keeps the full list available to assistive technology', () => {
    render(<TypedText items={items} />)
    expect(screen.getByText('React, TypeScript')).toHaveClass('visually-hidden')
  })

  it('shows a static list under reduced motion', () => {
    restore = mockReducedMotion(true)
    render(<TypedText items={items} />)
    expect(screen.getByText('React · TypeScript')).toBeInTheDocument()
    expect(screen.queryByTestId('typed-text')).not.toBeInTheDocument()
  })
})

describe('Counter', () => {
  it('exposes the final value to assistive technology', () => {
    render(<Counter value={8} suffix="+" />)
    expect(screen.getByText('8+', { selector: '.visually-hidden' })).toBeInTheDocument()
  })

  it('shows the final value immediately under reduced motion', () => {
    restore = mockReducedMotion(true)
    const { container } = render(<Counter value={8} suffix="+" />)
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('8+')
  })

  it('starts at zero until visible', () => {
    const { container } = render(<Counter value={8} suffix="+" />)
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('0+')
  })
})

describe('Reveal', () => {
  it('starts pending (hidden) until the content scrolls into view', () => {
    render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )
    expect(screen.getByText('Content').parentElement).toHaveAttribute('data-reveal', 'pending')
  })

  it('renders children without any animation wrapper state under reduced motion', () => {
    restore = mockReducedMotion(true)
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    )
    expect(screen.getByText('Visible content').parentElement).not.toHaveAttribute('data-reveal')
  })
})
