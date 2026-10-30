import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionProvider } from '../../components/MotionProvider'
import { skillGroups } from '../../content/skills'
import { Skills } from './Skills'

const setup = () =>
  render(
    <MotionProvider>
      <Skills />
    </MotionProvider>,
  )

describe('Skills', () => {
  it('renders all seven groups with their skills', () => {
    setup()
    skillGroups.forEach((g) => expect(screen.getByRole('heading', { level: 3, name: g.title })).toBeInTheDocument())
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(7)
  })

  it('pairs logos with visible text labels and shows unbranded skills as text', () => {
    setup()
    const react = screen.getByText('React.js (v19)').closest('li')!
    expect(react.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    const solid = screen.getByText('SOLID Principles').closest('li')!
    expect(solid.querySelector('svg')).toBeNull()
  })

  it('emphasises primary skills', () => {
    setup()
    expect(screen.getByText('TypeScript').closest('li')).toHaveAttribute('data-primary', 'true')
    expect(screen.getByText('Clean Architecture').closest('li')).toHaveAttribute('data-primary', 'true')
    expect(screen.getByText('Jest').closest('li')).not.toHaveAttribute('data-primary')
  })

  it('filters to a single group', async () => {
    const user = userEvent.setup()
    setup()
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: 'Testing & Quality' }))
    expect(screen.getByRole('button', { name: 'Testing & Quality' })).toHaveAttribute('aria-pressed', 'true')
    await waitFor(() => expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1))
    expect(screen.getByText('React Testing Library')).toBeInTheDocument()
    expect(screen.queryByText('Docker')).not.toBeInTheDocument()
  })

  it('moves focus between skills with arrow keys (one tab stop per group)', async () => {
    const user = userEvent.setup()
    setup()
    const group = screen.getByRole('heading', { name: 'Testing & Quality' }).closest('section')!
    const items = within(group).getAllByRole('listitem')
    expect(items[0]).toHaveAttribute('tabindex', '0')
    expect(items[1]).toHaveAttribute('tabindex', '-1')
    items[0].focus()
    await user.keyboard('{ArrowRight}')
    expect(items[1]).toHaveFocus()
    await user.keyboard('{End}')
    expect(items[items.length - 1]).toHaveFocus()
  })
})
