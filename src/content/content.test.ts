import { education } from './education'
import { experience } from './experience'
import { getContactDetails } from './contact'
import { profile } from './profile'
import { projects } from './projects'
import { site } from './site'
import { skillGroups } from './skills'

describe('content integrity', () => {
  it('lists the three roles newest first', () => {
    expect(experience.map((r) => `${r.company}|${r.title}`)).toEqual([
      'Omnicom Media Group|Lead Software Engineer',
      'Cognizant|Software Engineer',
      'Cognizant|Jr. Software Engineer',
    ])
    expect(experience[0].end).toBe('Present')
  })

  it('has six projects, all linked to a role', () => {
    expect(projects).toHaveLength(6)
    const roleIds = new Set(experience.map((r) => r.id))
    projects.forEach((p) => expect(roleIds.has(p.roleId)).toBe(true))
  })

  it('references only existing projects from experience', () => {
    const ids = new Set(projects.map((p) => p.id))
    experience.flatMap((r) => r.projects).forEach((p) => expect(ids.has(p.projectId)).toBe(true))
  })

  it('has seven skill groups', () => {
    expect(skillGroups).toHaveLength(7)
  })

  it('has the SRM University entry', () => {
    expect(education[0]).toMatchObject({ institution: 'SRM University', years: '2013-2017', city: 'Chennai' })
  })

  it('has three headline stats with 8+ years first', () => {
    expect(profile.stats).toHaveLength(3)
    expect(profile.stats[0]).toMatchObject({ value: 8, suffix: '+' })
  })

  it('exposes the approved contact details', () => {
    const contact = getContactDetails()
    expect(contact.email).toBe('ashish.codes2@gmail.com')
    expect(contact.phones).toEqual(['8979513242', '9625977569'])
    expect(contact.linkedin).toBe('https://www.linkedin.com/in/devnextcubical/')
    expect(contact.github).toBeUndefined()
  })

  it('does not store contact details as literal strings in the content config', () => {
    const raw = JSON.stringify(site)
    expect(raw).not.toContain('ashish.codes2@gmail.com')
    expect(raw).not.toContain('8979513242')
    expect(raw).not.toContain('9625977569')
  })
})
