# Tasks

## 1. Theme core (store, pre-paint script, metadata)

- [x] 1.1 Create `src/theme/theme.ts` (read/validate stored value, system default, `setTheme`, `toggleTheme`, `subscribe`, system-change following only while nothing is stored, safe `localStorage` access) and `src/hooks/useTheme.ts` using `useSyncExternalStore`; verify with unit tests for default dark, system light, stored value, invalid value, storage throwing and system change
- [x] 1.2 Add the inline pre-paint script to `index.html` (sets `data-theme` and `theme-color`, wrapped in `try/catch`), and update the `color-scheme` meta to `dark light`; verify with `npm run build` that the built HTML contains it before the app script and a reload test in the browser shows no flash
- [x] 1.3 Make the store update the `theme-color` meta and add a 250 ms `theme-transition` class on `<html>` that is skipped for reduced motion; verify with tests that the class is added and removed, and not added under reduced motion

## 2. Token refactor (dark theme unchanged)

- [x] 2.1 Add semantic tokens to `src/styles/tokens.css` (glass surfaces, overlay, chip colours, accent fill and on-accent, gradients, glows, particle colours, `--terminal-*`) with the current dark values, and set `color-scheme` per theme; verify `npm run build` passes
- [x] 2.2 Replace hard-coded colours in shell and shared components (`global.css`, `NavBar`, `Button`, `Chip`, `Section`, `TiltCard`, `Footer`) with tokens; verify the dark theme looks identical by viewing the page before and after, and that no hard-coded colours remain in those files
- [x] 2.3 Replace hard-coded colours in feature styles (`Hero`, `About`, `Experience`, `Education`, `Projects`, `ProjectCard`, `ProjectDialog`, `ProjectArt`, `Skills`, `SkillGroupCard`, `Contact`) with tokens, keeping the hero terminal on `--terminal-*`; verify the dark theme is unchanged visually and `grep` finds no raw colours outside `tokens.css` except documented exceptions

## 3. Light theme

- [x] 3.1 Add the `:root[data-theme='light']` token set (palette from design.md, darker accent text colours, filled-control colours, gradients, glows, borders); verify by setting the attribute manually in the browser that the page renders in light colours
- [x] 3.2 Make `Logo.tsx` theme-aware through per-theme `--logo-<key>` tokens in `tokens.css`; verify with a test that every logo used in the skills has a dark and a light token and visually that every logo, including Copilot and JavaScript, is visible in light theme
- [x] 3.3 Make `ProjectArt` and chip tones use theme tokens; verify the project cards and the dialog in light theme are legible
- [x] 3.4 Make `AnimatedBackground` read particle colours from tokens on mount and on theme change (CSS grid and glows via tokens); verify in the browser that toggling updates the particles without a reload and that text over it stays legible

## 4. Toggle UI

- [x] 4.1 Create `ThemeToggle` (native button, state-based `aria-label`, sun/moon icon from `react-icons/fa6`, 44x44 px, focus ring) and add it to `NavBar` between the primary nav and the hamburger; verify with tests for label, icon, click and keyboard (Enter and Space) and that it is visible at 320px with the mobile menu closed
- [x] 4.2 Add integration tests that toggling persists to storage, survives a re-render/remount, switches `data-theme` on `<html>`, and works when storage throws; verify `npm test` passes

## 5. Verification and docs

- [x] 5.1 Run an axe audit in a real browser in both themes (all sections loaded, plus the project dialog and mobile menu open) and fix any contrast issues; verify zero violations in each theme
- [x] 5.2 Run Lighthouse (mobile) on the production preview in each theme; verify all four categories are 90 or higher and CLS is 0
- [x] 5.3 Do a visual pass of every section, the dialog and the mobile menu at 320, 768 and 1280px in both themes, with reduced motion on and off; verify no dark-only block with unreadable text, no overflow and instant switching under reduced motion
- [x] 5.4 Update `README.md` (theming section: how tokens work, how to add a colour, storage key) and add the new tests to the suite; verify the documented steps work as written
- [x] 5.5 Run `npm run lint`, `npm test` and `npm run build`; verify all pass with no warnings

## Workflow follow-up

- Archive `build-ashish-portfolio` first (it is fully implemented but not archived), then update the `site-shell` requirement "Tech-themed visual identity" and its contrast statements so they cover both themes, and archive this change.
