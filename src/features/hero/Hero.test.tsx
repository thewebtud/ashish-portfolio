import { render, screen } from '@testing-library/react'
import { MotionProvider } from '../../components/MotionProvider'
import { Hero } from './Hero'

const setup = () =>
  render(
    <MotionProvider>
      <Hero />
    </MotionProvider>,
  )

describe('Hero', () => {
  it('shows name, title, summary and photo with alt text', () => {
    setup()
    expect(screen.getByRole('heading', { level: 1, name: 'Ashish Kumar' })).toBeInTheDocument()
    expect(screen.getByText('Lead Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText(/8\+ years building scalable single-page applications/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /portrait of ashish kumar/i })).toBeInTheDocument()
  })

  it('points the calls to action at the right targets', () => {
    setup()
    expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact')
    const resume = screen.getByRole('link', { name: /download resume/i })
    expect(resume).toHaveAttribute('href', '/Ashish_Kumar_Frontend_8Years.pdf')
    expect(resume).toHaveAttribute('download', 'Ashish_Kumar_Frontend_8Years.pdf')
  })

  it('lists all three headline stats with final values for assistive technology', () => {
    setup()
    expect(screen.getByText('8+', { selector: '.visually-hidden' })).toBeInTheDocument()
    expect(screen.getByText('5', { selector: '.visually-hidden' })).toBeInTheDocument()
    expect(screen.getByText('React 19', { selector: '.visually-hidden' })).toBeInTheDocument()
  })
})
