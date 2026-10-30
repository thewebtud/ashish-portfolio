import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionProvider } from '../../components/MotionProvider'
import { projects } from '../../content/projects'
import { Projects } from './Projects'

const setup = (items = projects) =>
  render(
    <MotionProvider>
      <Projects items={items} />
    </MotionProvider>,
  )

describe('Projects', () => {
  it('renders a card for each of the six projects', () => {
    setup()
    expect(screen.getAllByRole('article')).toHaveLength(6)
    projects.forEach((p) => expect(screen.getByRole('heading', { level: 3, name: p.name })).toBeInTheDocument())
  })

  it('marks AI products and the flagship', () => {
    setup()
    const assist = screen.getByRole('heading', { name: 'Q-Assist' }).closest('article')!
    expect(within(assist).getByText('AI')).toBeInTheDocument()
    const flagship = screen.getByRole('heading', { name: 'Q Cultural Insights' }).closest('article')!
    expect(within(flagship).getByText('Flagship')).toBeInTheDocument()
  })

  it('filters to the AI projects and reports the count', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: 'AI' }))
    expect(screen.getByRole('button', { name: 'AI' })).toHaveAttribute('aria-pressed', 'true')
    expect(await screen.findByText('Showing 2 projects')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Q-Assist' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Q-Sparks' })).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Telstra Prepaid Recharge' })).not.toBeInTheDocument(),
    )
  })

  it('shows an empty state when a filter matches nothing', async () => {
    const user = userEvent.setup()
    setup(projects.filter((p) => p.category === 'AI'))
    await user.click(screen.getByRole('button', { name: 'Enterprise' }))
    expect(await screen.findByText('No projects match this filter.')).toBeInTheDocument()
  })

  it('opens the detail dialog and returns focus to the card when closed with Escape', async () => {
    const user = userEvent.setup()
    setup()
    const trigger = screen.getByRole('button', { name: /view details of q-assist/i })
    await user.click(trigger)

    const dialog = await screen.findByRole('dialog', { name: 'Q-Assist', hidden: true })
    expect(within(dialog).getByText(/Omnicom Media Group · Lead Software Engineer/)).toBeInTheDocument()
    expect(within(dialog).getByText('Built the conversational chat interface')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('closes the dialog with the close button', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: /view details of q-sparks/i }))
    await screen.findByRole('dialog', { hidden: true })
    await user.click(screen.getByRole('button', { name: /close project details/i, hidden: true }))
    expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument()
  })

  it('does not include proprietary links or images in project content', () => {
    setup()
    expect(document.querySelectorAll('article img')).toHaveLength(0)
    projects.forEach((p) => {
      expect(JSON.stringify(p)).not.toMatch(/https?:\/\//)
    })
  })
})
