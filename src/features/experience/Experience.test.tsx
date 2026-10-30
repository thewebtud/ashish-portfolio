import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionProvider } from '../../components/MotionProvider'
import { Education } from '../education/Education'
import { Experience } from './Experience'

const setup = () =>
  render(
    <MotionProvider>
      <Experience />
    </MotionProvider>,
  )

describe('Experience timeline', () => {
  it('lists the three roles newest first with title, company, dates and location', () => {
    setup()
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((h) => h.textContent)).toEqual([
      expect.stringContaining('Lead Software Engineer'),
      expect.stringContaining('Software Engineer'),
      expect.stringContaining('Jr. Software Engineer'),
    ])
    expect(within(headings[0]).getByText('Omnicom Media Group')).toBeInTheDocument()
    expect(within(headings[0]).getByText(/06\/2021 – Present/)).toBeInTheDocument()
    expect(within(headings[0]).getByText('Current')).toBeInTheDocument()
    expect(within(headings[0]).getByText('Gurugram, IN')).toBeInTheDocument()
    expect(within(headings[2]).getByText(/02\/2018 – 02\/2019/)).toBeInTheDocument()
  })

  it('expands the most recent role by default and collapses the others', () => {
    setup()
    const triggers = screen.getAllByRole('button')
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true')
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'false')
    expect(triggers[2]).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('heading', { level: 4, name: 'Q-Assist' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 4, name: 'Telstra Prepaid Recharge' })).not.toBeInTheDocument()
  })

  it('toggles an entry from the keyboard', async () => {
    const user = userEvent.setup()
    setup()
    const trigger = screen.getAllByRole('button')[1]
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(await screen.findByRole('heading', { level: 4, name: 'Telstra Prepaid Recharge' })).toBeInTheDocument()
    await user.keyboard(' ')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('emphasises key terms from the resume', () => {
    setup()
    expect(screen.getAllByText('React 18', { selector: 'strong' }).length).toBeGreaterThan(0)
    expect(screen.getAllByText('GitHub Copilot', { selector: 'strong' }).length).toBeGreaterThan(0)
  })
})

describe('Education', () => {
  it('shows SRM University details', () => {
    render(
      <MotionProvider>
        <Education />
      </MotionProvider>,
    )
    expect(screen.getByRole('heading', { level: 3, name: 'SRM University' })).toBeInTheDocument()
    expect(screen.getByText('B.Tech. (Computer Science Engineering)')).toBeInTheDocument()
    expect(screen.getByText('2013-2017 · Chennai')).toBeInTheDocument()
  })
})
