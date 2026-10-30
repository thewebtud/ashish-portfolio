export type IconKey =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'redux'
  | 'html5'
  | 'css'
  | 'sass'
  | 'tailwind'
  | 'styledComponents'
  | 'bootstrap'
  | 'chakra'
  | 'mui'
  | 'axios'
  | 'mysql'
  | 'git'
  | 'jest'
  | 'testingLibrary'
  | 'webpack'
  | 'docker'
  | 'opentelemetry'
  | 'reactRouter'
  | 'githubCopilot'

export interface Skill {
  name: string
  icon?: IconKey
  primary?: boolean
}

export interface SkillGroup {
  id: string
  title: string
  skills: Skill[]
}

export type ProjectCategory = 'AI' | 'SaaS' | 'Consumer' | 'Enterprise'

export interface Project {
  id: string
  name: string
  tagline: string
  summary: string
  category: ProjectCategory
  employer: string
  roleId: string
  myRole: string
  highlights: string[]
  stack: string[]
  badges: Array<'AI' | 'Flagship'>
  accent: 'cyan' | 'violet' | 'blue' | 'green' | 'amber'
}

export interface ExperienceProject {
  projectId: string
  description: string
  bullets: string[]
}

export interface Role {
  id: string
  title: string
  company: string
  start: string
  end: string | 'Present'
  location: string
  projects: ExperienceProject[]
}

export interface Education {
  institution: string
  degree: string
  years: string
  city: string
}

export interface Stat {
  id: string
  label: string
  value: number
  prefix?: string
  suffix: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  summary: string
  focusAreas: string[]
  stats: Stat[]
  about: {
    paragraphs: string[]
    strengths: Array<{ title: string; text: string }>
  }
}

export interface SiteConfig {
  title: string
  description: string
  resume: { href: string; fileName: string }
  linkedin: string
  github?: string
  // Encoded so contact details are not literal strings in the built HTML
  encodedEmail: string
  encodedPhones: string[]
}
