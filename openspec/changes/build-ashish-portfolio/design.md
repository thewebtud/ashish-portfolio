## Context

The repo is a Vite 8 + React 19 JavaScript scaffold with ESLint 10 (flat config) and only `react`/`react-dom` as dependencies. `src/App.jsx` renders a single heading, and `src/assets/` holds `ashish-avatar.png` and the resume PDF. See proposal.md for motivation and scope.

Constraints: static hosting, minimal dependencies, WCAG 2.1 AA, Lighthouse 90+, and resume-only content. The portfolio also serves as a demonstration of Ashish's craft: modular, feature-based, Clean-Architecture-style code.

## Goals / Non-Goals

**Goals**
- Deliver a polished, animated, tech-themed SPA that is a credible showcase of senior frontend work.
- Keep content in typed data, so content edits never require component edits.
- Keep the initial JS payload small by code-splitting heavy, below-the-fold effects.

**Non-Goals**
- No backend, CMS, router library, global state library, CSS framework or component library.
- No unit-test suite for the whole UI in v1 beyond targeted tests of data integrity and key interaction logic.
- No analytics or cookies.

## Decisions

### 1. Single page with in-page anchors, no router
Sections are anchors on one page. Scroll-spy uses `IntersectionObserver`. Project detail is a modal (dialog), not a route. A static host serves `index.html` for the root only, so there are no 404 or rewrite concerns.
*Alternatives*: React Router with per-section routes. Rejected: it adds a dependency and host rewrite rules without value for a one-page portfolio. The resume mentions React Router, but showcasing it here is not worth the cost.

### 2. TypeScript for all new code
Convert the scaffold to TypeScript (`strict`), with `typescript-eslint` added to the flat ESLint config. Content modules are typed so the data model (roles, projects, skills) is enforced at compile time. TypeScript is a headline skill, and the site should reflect it.
*Alternative*: stay on JSX. Rejected: weaker data-contract guarantees and a poorer signal to recruiters.

### 3. Motion library: `motion` (Framer Motion successor)
Use `motion/react` for entrance/scroll-reveal, layout animation of filters (`layout`, `AnimatePresence`), the modal transition and the timeline progress (`useScroll`). It has first-class `useReducedMotion` and `LazyMotion` (with `domAnimation`) to keep the bundle small.
*Alternatives*: CSS only (insufficient for layout/exit animation and scroll-linked progress), GSAP (larger and a licence consideration), react-spring (less ergonomic for layout animation).
Plain CSS keyframes are still used for simple, continuous effects (cursor blink, glow pulse, background grid drift).

### 4. Logos via `react-icons` (Simple Icons set)
Import only individual icons from `react-icons/si` (React, TypeScript, Redux, Jest, Docker, Tailwind, etc.) so tree-shaking keeps the bundle small. Skills without a brand icon (SOLID, Agile) use text chips with a generic Lucide-style icon from the same package.
*Alternatives*: hand-collected SVGs (maintenance overhead), CDN icon fonts (extra requests, privacy and offline concerns). Company logos are not used by default (text wordmarks) to avoid trademark and asset issues.

### 5. Styling: CSS Modules + CSS custom properties (design tokens)
Design tokens (colours, spacing, type scale, radii, glow shadows) live in `src/styles/tokens.css`; components use `*.module.css`. This matches the resume's "design tokens", needs no new dependency, and is supported by Vite out of the box.
*Alternative*: Tailwind. Rejected: a new dependency and build config for little gain in a small, bespoke visual design.

### 6. Folder structure and data layer
```
src/
  app/            App.tsx, Layout, providers
  content/        profile.ts, experience.ts, projects.ts, skills.ts, education.ts, site.ts (typed data)
  features/
    hero/ about/ experience/ projects/ skills/ education/ contact/
  components/     Section, Button, Chip, Modal, Logo, Reveal, SectionHeading
  effects/        AnimatedBackground, TiltCard, Magnetic, TypedText, Counter
  hooks/          useScrollSpy, useReducedMotion, useInView, useMediaQuery
  styles/         tokens.css, global.css
  assets/         avatar, (resume copied to public/)
```
Presentation components receive typed props from the `content/` modules. Feature folders are independent (low coupling), and shared pieces are in `components/` and `effects/`.

### 7. Visual identity
Dark background (near-black navy), cyan/electric-blue and violet neon accents (echoing the blue in the avatar's backdrop), monospace accent font for labels and code-style snippets, and a faux-terminal card in the hero (for example `> ashish.profile()` output). Fonts are self-hosted (variable Inter + JetBrains Mono via `@fontsource`) to avoid third-party requests and layout shift.
Adds two small dependencies: `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`.

### 8. Animated background
A lightweight canvas or CSS grid/particle effect with pointer parallax, capped DPR and frame rate, paused when the tab is hidden or reduced motion is set. It is lazy-loaded after first paint so it does not affect LCP.

### 9. Resume asset and contact
Copy the PDF to `public/Ashish_Kumar_Frontend_8Years.pdf` so it has a stable URL for download and Open Graph. The email and phone numbers are stored encoded in `content/site.ts`, and assembled at runtime into `mailto:` and `tel:` links (and visible text) in the Contact section, so none of them is a literal string in the built HTML. LinkedIn is `https://www.linkedin.com/in/devnextcubical/`.

### 10. Accessibility patterns
Use native `<dialog>` for the project modal (focus trap, Escape, inert background), a `<button aria-expanded>` for timeline entries, `aria-pressed` for filter toggles, `aria-live="polite"` for result counts, and a skip link. All decorative effects use `aria-hidden`.

### 11. Testing and verification
Add Vitest + React Testing Library for targeted tests (content integrity, filters, timeline toggle, modal focus, reduced-motion fallbacks), matching Ashish's stack. Add `npm run lint` and `npm run build` to verification, plus a manual Lighthouse run (mobile) and axe check.
Adds dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`.

### 12. Hosting
Plain static output (`vite build`). Hosting target is undecided, and the `base` path is left at `/` and can be changed for GitHub Pages if needed.

## Risks / Trade-offs

- [Heavy animation hurts performance/accessibility] → Use transform/opacity only, lazy-load the background, honour reduced motion, and enforce the Lighthouse budget.
- [Bundle growth from motion and icons] → Use `LazyMotion` with `domAnimation`, import individual icons, and code-split the modal and background.
- [Unsupported or exaggerated content] → All text derives from the resume, and a content-review task cross-checks every claim; "5 products" counts the five client-facing products (Q Cultural Insights, Q-Assist, Q-Sparks, Telstra, Boost); the internal Asset Management App is shown as a sixth card but not counted. The count is confirmed by Ashish.
- [Trademark or confidentiality issues with company or product visuals] → Use text wordmarks and generic illustrative graphics, with no internal screenshots.
- [TypeScript migration touches scaffold files] → Done first, in an isolated task, and verified with lint and build before building features.
- [Email and phone scraping] → Runtime-assembled `mailto:`/`tel:` links, with no literal email or phone in the built HTML. Ashish has approved publishing them, so spam is an accepted risk.

## Migration Plan

1. Convert the scaffold to TypeScript and install dependencies.
2. Build the shell, tokens and content layer, then each feature section.
3. Add effects, accessibility, SEO and tests.
4. Verify with `npm run lint`, `npm run build`, `npm run preview` and a Lighthouse run.

There are no production users or data to migrate. Rollback is simply reverting the commit.

## Open Questions

- Deployment target and final URL (GitHub Pages, Netlify or Vercel) for Open Graph absolute URLs and `base`.
- Optional GitHub URL; the link is omitted until one is supplied.
- Whether to show a "Testimonials/Impact" section later if Ashish supplies metrics.
