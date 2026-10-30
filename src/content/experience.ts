import type { Role } from './types'

// `**term**` marks emphasised terms (rendered by the RichText component).
export const experience: Role[] = [
  {
    id: 'omnicom',
    title: 'Lead Software Engineer',
    company: 'Omnicom Media Group',
    start: '06/2021',
    end: 'Present',
    location: 'Gurugram, IN',
    projects: [
      {
        projectId: 'q-cultural-insights',
        description:
          'Q is a trend-analytics platform that identifies, sizes, and compares the top cultural trends defining any category, topic, or brand across audiences, countries, and languages.',
        bullets: [
          'Lead frontend development of QCore using **React 18**, **TypeScript**, and **Webpack 5**, architecting a modular, scalable codebase (SOLID, Clean Architecture, feature-based folders) with **Context API**, **custom hooks**, React Router-based **routing**, **authentication**, and error boundaries',
          'Built interactive trend-analytics dashboards and data visualizations (D3, Plotly, react-grid-layout) with advanced filtering, search, audience segmentation, and multi-format report export (PDF, PPTX, DOCX)',
          'Designed reusable, accessible UI component libraries (Chakra UI, SCSS/CSS Modules) and built **UI prototypes** to refine interaction concepts, optimizing performance via code-splitting, **lazy loading**, and **memoization** (React.memo, useMemo, useCallback)',
          'Delivered secure **OAuth**-based access control, integrated OpenTelemetry (Honeycomb) for **observability**, and led a dependency-modernization initiative (Webpack 5, ESLint 9, Jest 29), maintaining **unit/integration test** coverage (RTL, Playwright) while partnering closely with product managers and UX designers',
          'Leveraged **GitHub Copilot** with prompts and agents to accelerate feature development, scaffolding, and refactoring, improving delivery speed while maintaining code quality',
        ],
      },
      {
        projectId: 'q-assist',
        description:
          "QAssist is an AI-powered cultural-intelligence chatbot, built on OpenAI's GPT-4 and curated proprietary data, that generates sourced cultural insights on demand.",
        bullets: [
          'Built the QAssist **conversational chat interface** in React 18 and TypeScript, delivering a responsive, **real-time messaging** experience with streaming responses and prompt-driven interactions',
          'Implemented **pre-engineered prompt flows** and selectable prompt templates for consistent, high-quality AI outputs with source-attribution UI, and integrated the frontend with **GPT-4-backed services** via an Axios-based Adapter layer with dependency injection for testable service abstraction',
          'Built rich-text/HTML rendering of AI responses using sanitized output (DOMPurify) and memoized custom hooks for low-latency interactions',
          'Leveraged **GitHub Copilot** to speed up development and reduce delivery time',
        ],
      },
      {
        projectId: 'q-sparks',
        description:
          'QSparks is an AI creative-briefing tool that acts as a brainstorming partner, generating provocative campaign concepts and creative briefs grounded in relevant cultural trends.',
        bullets: [
          'Developed the QSparks AI creative-briefing experience in React 18 and TypeScript, enabling users to generate campaign concepts and briefs in minutes via multi-step Formik/Yup validated workflows',
          'Implemented **AI-generated content** and **AI image-generation** features **integrated with backend** generative services via Axios, handling async generation states',
          'Created rich-text editing and export capabilities (PDF, PPTX, DOCX) using Draft.js with responsive, accessible UI in Chakra UI',
          'Leveraged **GitHub Copilot** to accelerate scaffolding and iteration',
        ],
      },
    ],
  },
  {
    id: 'cognizant-se',
    title: 'Software Engineer',
    company: 'Cognizant',
    start: '02/2019',
    end: '05/2021',
    location: 'Bengaluru, IN',
    projects: [
      {
        projectId: 'telstra-prepaid',
        description: "Telstra is Australia's leading telecommunications company.",
        bullets: [
          'Developed and maintained the **prepaid recharge web application** (React, JavaScript), delivering responsive, customer-facing recharge and plan-management flows, and built/integrated REST API services for payments, plan selection, and account management',
          'Collaborated with backend and design teams in an **Agile environment** to ship features across release cycles',
          'Improved UI performance and cross-browser compatibility, contributing to **unit/integration testing** (React Testing Library, Jest) for production stability',
        ],
      },
      {
        projectId: 'boost-prepaid',
        description: "Boost is Australia's most reliable and economical wireless telecommunications brand.",
        bullets: [
          'Built customer-facing prepaid recharge features (React, JavaScript) and integrated payment gateways/REST APIs for secure transactions and account workflows',
          'Worked closely with cross-functional teams on **reusable UI components**; participated in **code reviews**, bug fixing, and testing to ensure a stable, high-quality user experience',
        ],
      },
    ],
  },
  {
    id: 'cognizant-jse',
    title: 'Jr. Software Engineer',
    company: 'Cognizant',
    start: '02/2018',
    end: '02/2019',
    location: 'Bengaluru, IN',
    projects: [
      {
        projectId: 'asset-management',
        description: 'Internal asset-management web application.',
        bullets: [
          'Contributed to an internal asset-management web application (Java/Spring, JavaScript, SQL) supporting asset creation, assignment, cost tracking, and release workflows, including CRUD operations and database interactions',
          'Supported testing, debugging, and documentation under the guidance of senior engineers',
        ],
      },
    ],
  },
]
