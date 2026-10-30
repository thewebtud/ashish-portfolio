# Ashish Kumar | Portfolio

Single-page portfolio for Ashish Kumar, Lead Frontend Developer. Built with React 19, TypeScript and Vite as a static site.

## Scripts

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server                           |
| `npm run build`   | Type-check (`tsc --noEmit`) and build `dist/`  |
| `npm run preview` | Serve the production build locally             |
| `npm run lint`    | Run ESLint                                     |
| `npm test`        | Run the Vitest + React Testing Library suite   |

## Editing content

All text lives in typed modules in [`src/content/`](src/content). Components never hold copy.

| File            | Controls                                                         |
| --------------- | ---------------------------------------------------------------- |
| `profile.ts`    | Name, title, summary, rotating focus areas, hero stats, About    |
| `experience.ts` | Roles and per-project bullets (`**term**` renders as emphasis)   |
| `projects.ts`   | Project cards and detail dialogs, filter categories              |
| `skills.ts`     | Skill groups and logo keys (logos are mapped in `components/Logo.tsx`) |
| `education.ts`  | Education entries                                                |
| `site.ts`       | Site title, resume file, LinkedIn, optional GitHub, contact data |

Only use claims that appear in the resume. Do not add internal screenshots, URLs or client data for Omnicom or Cognizant work.

### Contact details

The email and phone numbers in `site.ts` are Base64-encoded and decoded at runtime in the Contact section, so they are not literal strings in the built HTML. To change one, regenerate its value:

```sh
printf 'new-value' | base64
```

To show a GitHub link, uncomment `github` in `site.ts` and set the URL. Channels that are not configured are not rendered.

### Resume

The downloadable PDF is [`public/Ashish_Kumar_Frontend_8Years.pdf`](public/Ashish_Kumar_Frontend_8Years.pdf). Replace the file (keep the name, or update `site.resume`) to publish a new version.

## Structure

```
src/
  app/         App shell: layout, navbar, footer, progressive section loading
  content/     Typed content data (see above)
  features/    hero, about, experience, projects, skills, education, contact
  components/  Section, Button, Chip, Logo, Reveal, Enter, RichText, motion provider
  effects/     TypedText, Counter, TiltCard, Magnetic, AnimatedBackground
  hooks/       useScrollSpy, useReducedMotion, useInViewOnce, useMediaQuery
  styles/      Design tokens and global styles
```

## Theming

The site has a dark and a light theme, switched with the sun/moon button in the top bar.

- **Selection:** a visitor's explicit choice is stored in `localStorage` under `portfolio-theme` (`light` or `dark`). Without a stored choice the system colour scheme is used (dark if there is no preference), and the site follows system changes until the button is used.
- **No flash:** a small inline script in [`index.html`](index.html) sets `data-theme` on `<html>` before first paint. The logic mirrors [`src/theme/theme.ts`](src/theme/theme.ts), which owns the runtime state; React reads it with the `useTheme` hook.
- **Tokens:** all colours live in [`src/styles/tokens.css`](src/styles/tokens.css). `:root` holds the dark values and `:root[data-theme='light']` overrides them. Components must only use tokens (for example `var(--color-surface-glass)`), never raw colours.
- **Adding a colour:** define the token in both blocks, then use `var(--your-token)`. Keep text and icons at least 4.5:1 (large text 3:1) against the surfaces they sit on in **both** themes, and re-run the checks below.
- **Brand logos:** each logo has a `--logo-<key>` token per theme so light logos (for example GitHub Copilot) stay visible.
- **Hero terminal:** intentionally dark in both themes through the `--terminal-*` tokens.
- **Canvas background:** reads `--particle-*` tokens and redraws when the theme changes.
- **Checks:** `npm test` covers the theme store and toggle. Contrast cannot be unit-tested (jsdom has no layout), so run an axe audit and Lighthouse in a real browser in both themes before releasing.

## Design notes

- **Motion:** Hero entrance and scroll reveals are CSS-driven. The `motion` library is used only where layout or presence animation is needed (timeline, project and skill filters) and is loaded in separate chunks. All motion respects `prefers-reduced-motion`.
- **Performance:** Only the hero and navigation are in the first chunk. Other sections load one by one when the main thread is idle, and the animated background and project dialog are lazy chunks.
- **Accessibility:** Targets WCAG 2.1 AA: skip link, landmarks, keyboard-operable controls, native `<dialog>` for project details, `aria-pressed` filters and `aria-expanded` timeline entries. `npm test` runs an axe check over the full page (colour contrast is audited in a real browser, since jsdom has no layout).

## Bundle sizes (production build)

| Chunk                              | Size (gzip) |
| ---------------------------------- | ----------- |
| Initial JS (React, hero, nav)      | 93 kB       |
| Initial CSS                        | 6.3 kB      |
| Motion features (lazy)             | 31 kB       |
| Motion core shared chunk (lazy)    | 9.7 kB      |
| Sections, dialog, background (lazy)| under 5 kB each |

Lighthouse (mobile, production preview): Performance 100, Accessibility 100, Best Practices 100, SEO 100.

## Deployment

`npm run build` produces a static `dist/` that works on any static host. `public/404.html` redirects unknown paths to the home page. Before launch:

- Set the real site URL in the Open Graph and Twitter tags in `index.html` (social platforms need absolute image URLs, for example `https://example.com/og-image.jpg`).
- If the site is served from a sub-path (for example GitHub Pages project sites), set `base` in `vite.config.ts`.

## CI/CD

Workflows live in [`.github/workflows/`](.github/workflows).

| Workflow          | Trigger                | What it does                                                    |
| ----------------- | ---------------------- | --------------------------------------------------------------- |
| `ci.yml`          | PRs, non-`main` pushes | `npm ci`, lint, test, build                                     |
| `deploy-pages.yml`| push to `main`         | Runs CI, builds with `VITE_BASE=/<repo>/`, deploys to GitHub Pages |
| `deploy-vercel.yml` | push to `main`, PRs  | Runs CI, deploys with the Vercel CLI (production on `main`, preview on PRs) |

### One-time setup

**GitHub Pages:** Repo → Settings → Pages → Source: **GitHub Actions**. Site URL: `https://<user>.github.io/<repo>/`.

**Vercel:**

1. Run `npx vercel link` locally once; it writes `.vercel/project.json` (git-ignored) with `orgId` and `projectId`.
2. Create a token at https://vercel.com/account/tokens.
3. Add repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
4. In the Vercel project, disable its own Git auto-deploys (Settings → Git) to avoid double deploys.

The asset base path is controlled by `VITE_BASE` (default `/`, used by Vercel and local dev).
