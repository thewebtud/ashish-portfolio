import type { Profile } from './types'

export const profile: Profile = {
  name: 'Ashish Kumar',
  title: 'Lead Frontend Developer',
  tagline: 'Building scalable, accessible and AI-powered web applications.',
  summary:
    'Lead Frontend Developer with 8+ years building scalable single-page applications with React and TypeScript, grounded in SOLID principles and Clean Architecture.',
  focusAreas: [
    'React & TypeScript',
    'Clean Architecture',
    'Performance Optimization',
    'Data Visualization',
    'AI-assisted Development',
  ],
  stats: [
    { id: 'years', label: 'Years of frontend experience', value: 8, suffix: '+' },
    { id: 'products', label: 'Products delivered', value: 5, suffix: '' },
    { id: 'stack', label: 'Primary stack with TypeScript', value: 19, prefix: 'React ', suffix: '' },
  ],
  about: {
    paragraphs: [
      'I build scalable single-page applications using React, Redux, TypeScript and modern JavaScript, grounded in SOLID principles and Clean Architecture.',
      'I am skilled in unit and integration testing with React Testing Library and Jest, performance optimization and UI prototyping, and I use GitHub Copilot with prompts and agents to accelerate delivery.',
      'I partner with product managers, UX designers and cross-functional teams in Agile environments to ship high-quality trading and consumer applications.',
    ],
    strengths: [
      {
        title: 'Architecture',
        text: 'SOLID, design patterns and Clean Architecture with modular, feature-based codebases.',
      },
      {
        title: 'Quality',
        text: 'Unit and integration testing with React Testing Library, Jest and Playwright.',
      },
      {
        title: 'Performance',
        text: 'Code-splitting, lazy loading and memoization to keep large applications fast.',
      },
      {
        title: 'AI-assisted delivery',
        text: 'GitHub Copilot with prompts and agents for scaffolding, refactoring and faster delivery.',
      },
      {
        title: 'Collaboration',
        text: 'Agile-Scrum partnership with product managers, UX designers and backend teams.',
      },
      {
        title: 'Accessibility',
        text: 'Reusable, accessible component libraries aligned with WCAG standards.',
      },
    ],
  },
}
