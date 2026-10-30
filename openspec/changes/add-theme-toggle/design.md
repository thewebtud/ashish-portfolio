## Context

The app currently has one dark theme. `src/styles/tokens.css` defines the dark palette as CSS custom properties on `:root`, but many component styles still hard-code dark-specific colours: about 19 CSS modules use `rgba(...)` glass surfaces (for example `rgba(17, 26, 48, 0.62)`), `Logo.tsx` holds 22 brand colours chosen for a dark background, `ProjectArt` mixes gradients with `#060a14`, and the canvas background draws fixed cyan/blue particles. `index.html` declares `color-scheme: dark` and a dark `theme-color`. The navbar is `src/app/NavBar.tsx` (brand, primary nav with a Resume link, mobile hamburger).

See proposal.md for motivation and scope. `openspec/specs/` is empty because `build-ashish-portfolio` is implemented but not archived, so this change adds a new capability instead of modifying `site-shell`.

## Goals / Non-Goals

**Goals**
- A two-theme system driven entirely by design tokens, so components stay theme-agnostic.
- No flash of the wrong theme, no layout shift, no new dependencies, and Lighthouse stays at 90+.
- Both themes meet WCAG 2.1 AA contrast.

**Non-Goals**
- No third "system" option in the UI, no per-section themes, no cross-device sync.
- No redesign of layout or content; the dark theme must look the same after the token refactor.

## Decisions

### 1. `data-theme` attribute on `<html>` selects the token set
`:root` holds the dark tokens (the current look, and the fallback when JS is off). `:root[data-theme='light']` overrides them. Each block also sets `color-scheme` so native controls and scrollbars match.
*Alternatives*: a CSS class on `<body>` (applies later than `<html>`, so it risks a flash); `@media (prefers-color-scheme)` only (cannot support a manual override); separate stylesheets (extra request, harder to keep in sync).

### 2. Pre-paint inline script in `index.html`
A tiny synchronous script in `<head>` reads the stored choice, falls back to `matchMedia('(prefers-color-scheme: light)')`, then dark. It sets `data-theme` on `<html>` and the `theme-color` meta before the first paint. It is wrapped in `try/catch` so blocked storage never breaks the page.
*Alternative*: set the theme in React on mount. Rejected: causes a visible flash and layout-independent repaint on every load.

### 3. Small external store plus `useTheme` hook
`src/hooks/useTheme.ts` (with a `theme` module) exposes `theme`, `toggleTheme()` and `setTheme()`. The DOM attribute is the single source of truth. React reads it with `useSyncExternalStore`, so no provider or context is needed and canvas code can subscribe too. The store:
- writes `data-theme`, the `theme-color` meta and `localStorage` (`portfolio-theme`) inside `try/catch`;
- ignores invalid stored values;
- listens to the system preference and follows it only while no explicit choice is stored.

*Alternatives*: React context provider (more code, and the canvas effect would need to be wired through it); `next-themes`-style library (new dependency for ~40 lines of logic).

### 3a. Storage key and values
Key `portfolio-theme`, values `"light"` or `"dark"`. An explicit toggle always stores the new value, even if it equals the system preference.

### 4. Token strategy
Introduce semantic tokens so components never reference a raw colour:
- Surfaces: `--color-surface-glass` (cards), `--color-surface-glass-strong` (nav, dialog), `--color-overlay` (dialog backdrop), `--color-chip-bg`.
- Accent text colours: `--color-cyan`, `--color-violet`, `--color-green`, `--color-amber` keep their names, with darker light-theme values so they pass 4.5:1 on light surfaces.
- Fills: `--color-accent` (filled pills), `--color-on-accent`, `--gradient-accent` (text gradient) and `--gradient-accent-fill` (button background).
- Effects: `--glow-cyan`, `--glow-violet`, and `--particle-dot` / `--particle-line` (read by the canvas).
- Dark-only decoration that must stay dark in both themes (the hero terminal) uses `--terminal-*` tokens.

Alpha-based glass colours become tokens such as `rgba(255, 255, 255, 0.72)` in light and the existing `rgba(17, 26, 48, 0.62)` in dark. The refactor is done dark-first so dark output stays identical, then the light values are added.

### 5. Light palette (starting values, to be tuned against the contrast audit)
Background `#f6f8fc`, elevated `#ffffff`, text `#0f172a`, muted `#475569`, faint `#5b6b82`, border `rgba(15, 23, 42, 0.14)`. Accent text: cyan `#0e7490`, violet `#6d28d9`, blue `#1d4ed8`, green `#047857`, amber `#b45309`. Filled controls use `#0e7490` with white text. The gradient becomes `#0891b2 → #2563eb → #7c3aed` (large text only, at least 3:1). This keeps the same cyan/violet accent family as the dark theme.

### 6. Theme-aware brand logos
Each logo has a `--logo-<key>` colour token defined per theme in `tokens.css`, and `Logo.tsx` sets `color: var(--logo-<key>)`. Light values are darkened where the brand colour fails 3:1 on a light surface (for example JavaScript yellow and GitHub Copilot's near-white mark). A unit test checks that every logo used in the skills has a dark and a light token.

### 7. Project art and chips
`ProjectArt` replaces `#060a14` in `color-mix()` with `var(--color-bg)`, and the grid line colour comes from a token. Chip tones read from `--chip-*` tokens defined per theme.

### 8. Hero terminal stays dark
The terminal card is a code-editor convention, so it keeps a dark surface in both themes using `--terminal-*` tokens with their own readable text colours. It is decorative and `aria-hidden`.

### 9. Animated background
`AnimatedBackground` reads `--particle-dot` and `--particle-line` (as RGB triplets) from `getComputedStyle` on mount and again whenever the theme store changes, then keeps drawing with the new colours. CSS grid lines and glows use tokens. Light-theme particles use lower opacity and darker hues so text stays legible.

### 10. Toggle component
`ThemeToggle` is a native `<button type="button">` with `aria-label` "Switch to light theme" or "Switch to dark theme". It shows `FaSun` in dark theme (action: go light) and `FaMoon` in light theme. It is at least 44x44 px, uses the global focus ring, and sits in the navbar between the primary nav and the hamburger, so it stays visible when the mobile menu is closed. The label is state-based, so `aria-pressed` is not used (it would double-announce).
Icon swap uses the already installed `react-icons/fa6` set, so there is no new dependency.

### 11. Smooth change, reduced motion and CLS
On toggle the store adds a `theme-transition` class to `<html>` for 250 ms, which transitions only colour properties (`background-color`, `color`, `border-color`, `box-shadow`, `fill`, `stroke`). It is skipped when `prefers-reduced-motion` is set. No layout properties change, so CLS stays 0.

### 12. Testing and verification
- Vitest + React Testing Library: store (default, system, stored value, invalid value, storage throwing, system-change following), toggle (label, state, keyboard, persistence, icon), navbar placement.
- Real-browser checks through the browser tool: axe contrast in both themes, Lighthouse on the production preview for both themes, visual pass of every section and the dialog, and a reload test for flash.
- jsdom has no layout, so contrast cannot be unit-tested.

## Risks / Trade-offs

- [Missed hard-coded colour leaves a dark block in light theme] → Grep the codebase for `rgba(`, hex colours and `color-mix` outside `tokens.css`, and do a visual pass of each section and the dialog in light theme.
- [Brand colours fail contrast on light] → Per-theme logo colours and a contrast audit.
- [Flash of wrong theme] → Pre-paint inline script, verified by a reload test.
- [`transition` rules on `*` during the switch affect performance] → Applied for 250 ms only and only to colour properties.
- [Inline script and strict CSP later] → No CSP is configured today; if one is added, the script needs a hash or nonce.
- [Spec drift with `build-ashish-portfolio` `site-shell`] → Follow-up task to update its "Tech-themed visual identity" requirement after that change is archived.

## Migration Plan

1. Refactor to semantic tokens with the dark theme unchanged (verified visually and by tests).
2. Add the theme store, inline script and light tokens.
3. Convert remaining hard-coded colours section by section.
4. Add the toggle and tests, then audit both themes.

No data migration; rollback is reverting the commit. Visitors have no stored value, so the first load uses their system preference.

## Open Questions

- None that block implementation. Assumed defaults: icon-only toggle, system preference by default, same accent family in light mode. These can be adjusted later without changing the capability.
