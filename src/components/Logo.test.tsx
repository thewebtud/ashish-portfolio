import { render } from '@testing-library/react'
import { skillGroups } from '../content/skills'
import { Logo } from './Logo'
import tokens from '../styles/tokens.css?raw'

const iconKeys = Array.from(new Set(skillGroups.flatMap((g) => g.skills.flatMap((s) => (s.icon ? [s.icon] : [])))))

describe('Logo', () => {
  it('uses a theme token for its colour and stays decorative', () => {
    const { container } = render(<Logo name="githubCopilot" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg.getAttribute('style')).toContain('var(--logo-githubCopilot)')
  })

  it('has a dark and a light colour defined for every logo used in the skills', () => {
    const light = tokens.slice(tokens.indexOf(":root[data-theme='light']"))
    const dark = tokens.slice(0, tokens.indexOf(":root[data-theme='light']"))
    iconKeys.forEach((key) => {
      expect(dark).toContain(`--logo-${key}:`)
      expect(light).toContain(`--logo-${key}:`)
    })
  })
})
