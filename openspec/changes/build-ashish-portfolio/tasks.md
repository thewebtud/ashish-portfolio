# Tasks

## 1. Foundation: TypeScript, dependencies and tooling

- [x] 1.1 Install `motion`, `react-icons`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`, `typescript`, `typescript-eslint`; verify `npm install` succeeds and `package.json` lists them
- [x] 1.2 Add `tsconfig.json` (strict), rename `main.jsx`/`App.jsx`/`vite.config.js` to TypeScript, and update `eslint.config.js` for `.ts/.tsx`; verify `npm run lint` and `npm run build` pass
- [x] 1.3 Install and configure Vitest + React Testing Library + jest-dom (jsdom) with an `npm test` script; verify a smoke test renders `App` and passes
- [x] 1.4 Create the folder structure from design.md; verify the expected directories exist
- [x] 1.5 Copy the resume PDF to `public/Ashish_Kumar_Frontend_8Years.pdf`; verify `npm run dev` serves it at `/Ashish_Kumar_Frontend_8Years.pdf`

## 2. Content layer and design tokens

- [x] 2.1 Define content types and populate `profile`, `experience`, `education`, `projects`, `skills` and `site` modules from the resume; verify the project compiles with `tsc --noEmit`
- [x] 2.2 Write content-integrity tests (three roles in order, six projects, seven skill groups, SRM entry, LinkedIn URL, email and both phone numbers present); verify `npm test` passes
- [x] 2.3 Create `tokens.css` (palette, spacing, type scale, glow shadows) and `global.css` (reset, fonts, focus styles, reduced-motion defaults); verify the base page renders the dark theme

## 3. Shell, navigation and SEO

- [x] 3.1 Build `Layout`, `Section`, `SectionHeading`, `Button`, `Chip` components and render empty sections in order; verify all seven section anchors exist in the DOM
- [x] 3.2 Implement sticky navbar with smooth scroll, scroll offset, deep links and `useScrollSpy`; add a test for active-link logic and verify manually that links scroll correctly
- [x] 3.3 Implement the mobile menu (collapsible, closes on selection, Escape, focus handling); add a test and verify at 320px width
- [x] 3.4 Add the skip link, semantic landmarks and the footer with a back-to-top control; verify keyboard Tab order and test the skip link
- [x] 3.5 Update `index.html` with title, description, language, favicon, Open Graph and Twitter tags, and add an OG image; verify tags appear in the built `dist/index.html`

## 4. Motion and effects primitives

- [x] 4.1 Implement `useReducedMotion`, `useInView` and the `Reveal` (scroll-reveal once) component with `LazyMotion`; add a test for the reduced-motion fallback
- [x] 4.2 Implement `TypedText`/rotating text with a static accessible fallback; add tests for cycling and reduced-motion
- [x] 4.3 Implement `Counter` (count-up once on view, final value without motion); add tests
- [x] 4.4 Implement `TiltCard` and `Magnetic` with pointer-only behavior and keyboard-focus equivalents; verify with a manual check on pointer and touch emulation
- [x] 4.5 Implement the lazy-loaded `AnimatedBackground` (pointer parallax, capped frame rate, pause on hidden tab, `aria-hidden`); verify it does not affect text contrast and pauses when the tab is hidden

## 5. Hero and About

- [x] 5.1 Build the Hero with name, title, summary, avatar with alt text and fallback, terminal-style card and staged entrance; verify the visible content at 1280x720
- [x] 5.2 Add the animated role line, headline stats and the CTAs (View Work, Download Resume, Contact); test that each CTA targets the right anchor or file
- [x] 5.3 Build the About section with the profile summary and strengths cards from the resume; verify that content matches the resume

## 6. Experience and Education

- [x] 6.1 Build the experience timeline with the three roles, project groups and bullets, emphasised terms and the "Present" marker; verify order and fields with tests
- [x] 6.2 Implement expandable entries (`aria-expanded`, keyboard operable, most recent expanded by default); add tests for toggle and default state
- [x] 6.3 Add scroll-linked progress line and markers with a static fallback for reduced motion; verify manually in both modes
- [x] 6.4 Build the Education section (SRM University, B.Tech CSE, 2013-2017, Chennai); verify the content with a test

## 7. Projects

- [x] 7.1 Build project cards for all six projects with description, domain tag, tech chips and AI/flagship badges; verify six cards render with tests
- [x] 7.2 Implement category filters (`aria-pressed`, animated layout, live result count, empty state); add tests for the AI filter and the empty state
- [x] 7.3 Implement the project detail dialog (open, Escape/backdrop/close button, focus trap and return, inert background) with illustrative generic graphics; add tests for focus return and Escape
- [x] 7.4 Review the project content against the resume and confidentiality rules; verify no internal screenshots, URLs or unsupported metrics are present

## 8. Skills

- [x] 8.1 Build the grouped skills grid with logos (individual `react-icons/si` imports), text chips for unbranded skills and primary-skill emphasis; verify with tests that all seven groups render
- [x] 8.2 Implement group filtering with animated transitions and selected state; add a test for the "Testing & Quality" filter
- [x] 8.3 Add hover/focus highlight on skill items; verify that labels remain readable and keyboard focus is visible

## 9. Contact and resume

- [x] 9.1 Build the Contact section showing the email, both phone numbers and LinkedIn, with runtime-assembled `mailto:`/`tel:` links and safe external links; test that the links are correct and that unconfigured channels (GitHub) are not rendered
- [x] 9.2 Wire the resume download button in hero, navbar and contact; verify the download from `public/` works in `npm run preview`
- [x] 9.3 Verify that `dist/index.html` contains neither the email nor any phone number as a literal string, and that all are visible in the rendered Contact section

## 10. Polish and integration checks

- [x] 10.1 Run an accessibility pass (axe, keyboard-only, screen reader spot check, 4.5:1 contrast) and fix issues; verify zero serious/critical axe violations
- [x] 10.2 Verify responsive behavior at 320, 768, 1280 and 1920px with no horizontal overflow
- [x] 10.3 Run Lighthouse (mobile) on `npm run preview` and fix issues; verify all four categories are 90 or higher
- [x] 10.4 Check the bundle size (code-split background and modal) and confirm no unnecessary dependencies; record sizes in the README
- [x] 10.5 Replace the placeholder README with run/build/test instructions, the content-editing guide and the deployment notes; verify the documented commands run as written
- [x] 10.6 Run `npm run lint`, `npm test` and `npm run build`; verify all pass with no warnings

## Workflow follow-up

- Confirm the deployment URL and any GitHub URL with Ashish and update `content/site.ts`.
- Archive the change after review and verify the archived result.
