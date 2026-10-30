# Proposal

## Why

The repository is an empty Vite + React scaffold (`App.jsx` renders a single heading). Ashish Kumar, a Lead Frontend Developer with 8+ years of experience, needs a portfolio that presents his profile and shows his work to recruiters and hiring managers. A PDF resume alone does not show frontend craft, so the site must demonstrate it through interaction, motion and a tech-savvy look, while surfacing his experience, skills and AI-product work quickly.

## What Changes

- Build a single-page React application (SPA) with a dark, "developer-terminal / neon-tech" visual identity, using Ashish's photo (`src/assets/ashish-avatar.png`) and resume (`src/assets/Ashish_Kumar_Frontend_8Years.pdf`) as source assets.
- Add a sticky navigation with smooth scrolling and scroll-spy across these sections: Hero, About, Experience, Projects, Skills, Education, Contact.
- Add a **Hero** with an animated headline, a typed or rotating role line, a short value summary, the photo, headline stats (8+ years, 5 products, React 19 / TypeScript) and primary calls to action (View Work, Download Resume, Contact).
- Add an **Experience timeline** covering Omnicom Media Group (Lead Software Engineer, 06/2021–Present) and Cognizant (Software Engineer 02/2019–05/2021; Jr. Software Engineer 02/2018–02/2019), with the resume's achievements per role.
- Add a **Projects showcase** of Q Cultural Insights (QCore), Q-Assist, Q-Sparks, Telstra Prepaid Recharge, Boost Prepaid Recharge and the Asset Management App. Each has a card that opens an animated detail view with the problem, role, highlights and tech stack, using only resume-level information.
- Add a **Skills showcase** with technology logos/icons grouped as in the resume (Core Frontend, State & Data, Styling & UI, Testing & Quality, Monitoring & Analytics, Engineering Fundamentals, Ways of Working), with interactive filtering/hover.
- Add **Education**, **Contact** and **Resume download** (the PDF is shipped as a static asset).
- Add a shared **motion and interaction system**: scroll-reveal, parallax/animated background, magnetic/tilt hover effects, animated counters and page-load choreography, all honouring `prefers-reduced-motion`.
- Store all content in typed data modules separate from presentation components.
- Add SEO and social-share metadata, favicon, accessibility (WCAG 2.1 AA) and performance baselines (Lighthouse 90+).
- Adopt TypeScript for the new code (see design).

Out of scope: backend or CMS, blog, authentication, analytics/tracking, multi-language support, a light theme (dark only for v1), a real contact-form backend (contact is via links), custom domain/deployment pipeline, and any internal screenshots, URLs or data from Omnicom/Cognizant projects.

## Capabilities

### New Capabilities
- `site-shell`: SPA layout, sticky navigation with scroll-spy and smooth scrolling, mobile menu, footer, theme tokens, SEO/social metadata, accessibility and performance baseline.
- `hero-intro`: Landing section with animated headline, role line, summary, photo, key stats and primary calls to action.
- `career-timeline`: Work experience and education presented as an interactive, animated timeline.
- `project-showcase`: Project cards and detail views for the six products on the resume.
- `skills-showcase`: Grouped, filterable technology skills with logos/icons.
- `contact-and-resume`: Contact links, social links and resume download/view.
- `motion-and-interaction`: Shared animation primitives and tech-themed effects, with reduced-motion and performance constraints.

### Modified Capabilities
<!-- None: openspec/specs is empty. -->

## Impact

- **Code**: Replaces `src/App.jsx` and `src/App.css`/`src/index.css`; adds `src/` feature folders, a content data layer, and components. Migrates the scaffold from JS to TypeScript (`tsconfig`, `main.tsx`, `App.tsx`, `vite.config.ts`, ESLint config updates).
- **Dependencies** (justified in design): an animation library (`motion`), an icon/logo set (`react-icons`) and `typescript` with `typescript-eslint`. No router, state library or CSS framework.
- **Assets**: `src/assets/ashish-avatar.png` and the resume PDF (the PDF must be exposed from `public/` or imported as a URL for download); add favicon and an Open Graph image.
- **Content needed from Ashish before or during implementation**:
  - Provided and approved: LinkedIn (https://www.linkedin.com/in/devnextcubical/), email (`ashish.codes2@gmail.com`), both phone numbers (8979513242, 9625977569), the "5 products" count and the project descriptions.
  - Still open: an optional GitHub URL (the link is omitted until supplied).
  - A site title/tagline preference and the deployment URL for Open Graph tags.
  - Optional: public logos for Omnicom, Cognizant, Telstra, Boost and SRM. The default uses text wordmarks to avoid trademark and asset issues.
- **Risks**: Heavy animation may hurt performance and accessibility; mitigated by reduced-motion support, lazy loading and a Lighthouse budget.
