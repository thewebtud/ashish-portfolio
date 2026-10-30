import { findActiveSection } from './useScrollSpy'

describe('findActiveSection', () => {
  const positions = [
    { id: 'home', top: -900 },
    { id: 'about', top: -300 },
    { id: 'experience', top: 120 },
    { id: 'projects', top: 900 },
  ]

  it('returns the last section whose top crossed the threshold', () => {
    expect(findActiveSection(positions, 250)).toBe('experience')
  })

  it('falls back to the first section when none has crossed', () => {
    expect(findActiveSection([{ id: 'home', top: 400 }], 100)).toBe('home')
  })

  it('returns null with no sections', () => {
    expect(findActiveSection([], 100)).toBeNull()
  })
})
