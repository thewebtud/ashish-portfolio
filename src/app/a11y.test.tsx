import axe from 'axe-core'
import { render, waitFor } from '@testing-library/react'
import App from './App'

describe('accessibility (axe, jsdom)', () => {
  it('has no WCAG A/AA violations once all sections have loaded', async () => {
    const { container } = render(<App />)
    await waitFor(() => expect(container.querySelectorAll('main > section')).toHaveLength(7), { timeout: 8000 })

    const results = await axe.run(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      // jsdom has no layout or stylesheets; contrast is audited in a real browser instead
      rules: { 'color-contrast': { enabled: false } },
    })

    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
  }, 15000)
})
