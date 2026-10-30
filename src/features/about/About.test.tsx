import { render, screen } from '@testing-library/react'
import { MotionProvider } from '../../components/MotionProvider'
import { profile } from '../../content/profile'
import { About } from './About'

describe('About', () => {
  it('shows the profile paragraphs and every strength', () => {
    render(
      <MotionProvider>
        <About />
      </MotionProvider>,
    )
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    profile.about.paragraphs.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument())
    profile.about.strengths.forEach((s) =>
      expect(screen.getByRole('heading', { level: 3, name: s.title })).toBeInTheDocument(),
    )
  })
})
