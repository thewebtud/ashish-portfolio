# Proposal

## Why

The portfolio ships with a dark, neon "tech" theme only. Recruiters and hiring managers read in very different conditions (bright offices, projectors, printed or accessibility-driven preferences), and some find light-on-dark text harder to read. A visible light/dark toggle lets each visitor pick the more comfortable theme, respects their OS preference by default, and shows frontend craft (design tokens, accessible controls, no theme flash).

## What Changes

- Add a **theme toggle button** in the top navigation bar, visible on desktop and mobile, that switches the whole app between **dark** and **light** mode.
- Add a **light theme** with a full palette (backgrounds, surfaces, text, borders, accent colours, glows and gradients) that meets WCAG 2.1 AA contrast.
- **Default** to the visitor's OS setting (`prefers-color-scheme`); when no preference is available, default to dark (the current look).
- **Persist** the visitor's explicit choice in the browser so it is kept across reloads and visits.
- **Apply the theme before first paint** so there is no flash of the wrong theme.
- Update `theme-color` and `color-scheme` metadata, form-control and scrollbar rendering, and the decorative background so they follow the active theme.
- Make all surfaces, logos, project art, chips, buttons and effects theme-aware by moving remaining hard-coded colours into design tokens.
- Out of scope: more than two themes, a separate "system" option in the UI (system preference is only the initial default), per-section themes, syncing the choice across devices, server-side storage, and cookies.

## Capabilities

### New Capabilities
- `theme-switching`: Light and dark themes, the navigation toggle, default selection from the OS preference, persistence of the choice, flash-free initial render, and theme-aware metadata and decorative effects.

### Modified Capabilities
<!-- None in openspec/specs: it is empty because `build-ashish-portfolio` is not archived yet.
     That change's `site-shell` requirement "Tech-themed visual identity" says the site uses a dark theme
     and its contrast requirements apply to the single theme. Once `build-ashish-portfolio` is archived,
     update that requirement to cover both themes (see Impact and tasks follow-up). -->

## Impact

- **Code**:
  - `src/styles/tokens.css` and `global.css`: split into dark and light token sets selected by a `data-theme` attribute on `<html>`.
  - About 19 CSS module files and a few components that currently use hard-coded dark colours (`rgba(...)` surfaces, brand-logo colours, project art gradients, chip tones, canvas particle colours) move to tokens.
  - New navigation toggle component and a small theme hook/provider in `src/app`/`src/hooks`.
  - `index.html`: an inline script that sets the theme before first paint, plus `color-scheme` and `theme-color` meta updates.
  - `src/effects/AnimatedBackground.tsx`: read particle and glow colours from the active theme.
  - Tests: toggle behaviour, persistence, OS default, and an axe contrast check in a real browser for both themes.
- **Dependencies**: none expected.
- **Interaction with `build-ashish-portfolio`**: it is fully implemented but not archived, so `openspec/specs/` is empty. This change adds a new capability only. After archiving the first change, its `site-shell` "Tech-themed visual identity" requirement (dark theme only) must be updated to avoid contradicting this change.
- **Content or assets needed from Ashish**: none required. Defaults assumed: the toggle is an icon button (sun/moon) with an accessible label, the light theme keeps the same cyan/violet accent family, and the default follows the OS setting. Please say if you prefer a different default (for example always start in dark) or a labelled toggle.
- **Risks**: some brand logos and gradients may lose contrast on a light background (mitigated by theme-specific logo colours and a contrast audit of both themes); a flash of the wrong theme (mitigated by the pre-paint script); the Lighthouse 90+ budget (mitigated by keeping the script tiny and adding no dependencies).
