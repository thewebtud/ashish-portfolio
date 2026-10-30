import { render, screen } from '@testing-library/react'
import { MotionProvider } from '../../components/MotionProvider'
import { Contact } from './Contact'

const setup = () =>
  render(
    <MotionProvider>
      <Contact />
    </MotionProvider>,
  )

describe('Contact', () => {
  it('shows the email as a mailto link', () => {
    setup()
    const link = screen.getByRole('link', { name: /ashish\.codes2@gmail\.com/ })
    expect(link).toHaveAttribute('href', 'mailto:ashish.codes2@gmail.com')
  })

  it('shows both phone numbers as tel links', () => {
    setup()
    expect(screen.getByRole('link', { name: /\+91-8979513242/ })).toHaveAttribute('href', 'tel:+918979513242')
    expect(screen.getByRole('link', { name: /\+91-9625977569/ })).toHaveAttribute('href', 'tel:+919625977569')
  })

  it('opens LinkedIn in a new tab with noopener noreferrer', () => {
    setup()
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/devnextcubical/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not render a GitHub channel when none is configured', () => {
    setup()
    expect(screen.queryByText(/github/i)).not.toBeInTheDocument()
  })

  it('offers the resume download', () => {
    setup()
    const link = screen.getByRole('link', { name: /download resume \(pdf\)/i })
    expect(link).toHaveAttribute('href', '/Ashish_Kumar_Frontend_8Years.pdf')
    expect(link).toHaveAttribute('download', 'Ashish_Kumar_Frontend_8Years.pdf')
  })
})
