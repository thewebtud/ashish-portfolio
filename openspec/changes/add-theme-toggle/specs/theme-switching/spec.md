# Spec Delta

## Purpose

Lets visitors switch the whole portfolio between a dark and a light theme from the top navigation, defaulting to dark and remembering their choice.

## ADDED Requirements

### Requirement: Theme toggle in the navigation bar
The navigation bar SHALL contain a theme toggle button at the far right (top-right corner) of the bar, after all other controls, visible on all viewport widths including when the mobile menu is closed, that switches the app between light and dark themes each time it is activated.

#### Scenario: Toggle from dark to light
- **WHEN** the app is in dark theme and the visitor activates the toggle
- **THEN** the whole app switches to the light theme

#### Scenario: Toggle from light to dark
- **WHEN** the app is in light theme and the visitor activates the toggle
- **THEN** the whole app switches to the dark theme

#### Scenario: Visible on mobile
- **WHEN** the viewport is 320px wide and the mobile menu is closed
- **THEN** the theme toggle is visible and operable in the top bar

### Requirement: Accessible toggle control
The toggle SHALL be a native button operable by keyboard and touch, SHALL expose its state to assistive technology, SHALL have an accessible name describing the action, and SHALL show a visible focus indicator and a touch target of at least 44x44 CSS pixels.

#### Scenario: Keyboard operation
- **WHEN** a keyboard user focuses the toggle and presses Enter or Space
- **THEN** the theme switches and focus stays on the toggle

#### Scenario: State announced
- **WHEN** a screen reader reads the toggle
- **THEN** it announces a name such as "Switch to light theme" or "Switch to dark theme" that matches the action, and the current state

#### Scenario: Icon reflects the action
- **WHEN** the dark theme is active
- **THEN** the toggle shows an icon indicating light mode will be activated, and the reverse in light theme

### Requirement: Toggle tooltip
The toggle SHALL show a tooltip with its action text (for example "Switch to light theme") when the pointer hovers over it or it has keyboard focus. The tooltip SHALL stay visible while the pointer is over it, SHALL be dismissible with the Escape key without moving focus, SHALL be readable in both themes, and SHALL NOT cause the label to be announced twice by assistive technology.

#### Scenario: Hover
- **WHEN** the visitor hovers over the toggle
- **THEN** a tooltip with the action text appears next to it and does not overflow the viewport

#### Scenario: Keyboard focus
- **WHEN** a keyboard user focuses the toggle
- **THEN** the same tooltip appears

#### Scenario: Dismiss
- **WHEN** the tooltip is visible and the visitor presses Escape
- **THEN** the tooltip hides and focus stays on the toggle

#### Scenario: Text follows the theme
- **WHEN** the theme changes
- **THEN** the tooltip text changes to the new action

#### Scenario: Touch
- **WHEN** the visitor taps the toggle on a touch device
- **THEN** the theme switches and no hover-only information is required to use it

### Requirement: Dark theme by default
When the visitor has not made an explicit choice, the app SHALL use the dark theme, regardless of the system colour-scheme preference.

#### Scenario: System prefers light
- **WHEN** a first-time visitor whose system prefers a light colour scheme opens the site
- **THEN** the dark theme is shown

#### Scenario: System prefers dark
- **WHEN** a first-time visitor whose system prefers a dark colour scheme opens the site
- **THEN** the dark theme is shown

#### Scenario: System preference changes while no choice is stored
- **WHEN** the visitor has never used the toggle and the system preference changes while the site is open
- **THEN** the theme does not change

### Requirement: Persisted explicit choice
The app SHALL remember the visitor's explicit theme choice in the browser, restore it on later visits, and give it priority over the dark default. The app SHALL continue to work with the default theme if storage is unavailable.

#### Scenario: Choice survives reload
- **WHEN** the visitor selects the light theme and reloads the page
- **THEN** the light theme is shown

#### Scenario: Choice overrides the default
- **WHEN** the visitor stored "light" and their system prefers dark
- **THEN** the light theme is shown

#### Scenario: Storage unavailable
- **WHEN** browser storage is blocked or throws an error
- **THEN** the toggle still switches the theme for the current page view and no error is shown to the visitor

#### Scenario: Invalid stored value
- **WHEN** the stored value is not a valid theme
- **THEN** it is ignored and the dark default is used

### Requirement: No flash of the wrong theme
The selected theme SHALL be applied before the first paint of the page, so a visitor never sees the wrong theme flash on load or reload.

#### Scenario: Reload in light theme
- **WHEN** the visitor with a stored light choice reloads the page
- **THEN** the first painted frame already uses the light theme

### Requirement: Complete light theme
Every section, component, logo, illustration, dialog, focus indicator and decorative effect SHALL be legible and visually consistent in both themes, with no leftover dark-only surfaces or light-only text.

#### Scenario: All sections in light theme
- **WHEN** the visitor views each section and the project dialog in the light theme
- **THEN** all text, icons and surfaces use the light palette and none appears as a dark block with unreadable text

#### Scenario: Brand logos stay visible
- **WHEN** skill logos whose brand colour is light, such as the GitHub Copilot mark, are shown in the light theme
- **THEN** they remain clearly visible against their background

### Requirement: Contrast in both themes
Text and meaningful UI components in both themes SHALL meet WCAG 2.1 AA contrast: at least 4.5:1 for normal text and 3:1 for large text, icons and component boundaries.

#### Scenario: Automated audit
- **WHEN** an accessibility audit runs in a real browser against the page in each theme
- **THEN** it reports no colour-contrast violations

### Requirement: Theme-aware browser chrome
The app SHALL tell the browser which colour scheme is active so native controls, scrollbars and the browser toolbar colour match the selected theme.

#### Scenario: Native UI follows theme
- **WHEN** the light theme is active
- **THEN** native scrollbars and form controls render in their light style and the browser theme colour matches the page background

### Requirement: Theme-aware decorative effects
The animated background and glow effects SHALL use colours appropriate to the active theme, SHALL keep text legible over them, and SHALL update immediately when the theme changes without a reload.

#### Scenario: Background updates on toggle
- **WHEN** the visitor toggles the theme while the animated background is running
- **THEN** the particles and glows switch to the new theme colours without a reload or visible glitch

### Requirement: Theme change transition
Switching themes SHALL transition colours smoothly in a short time (no longer than 300 ms), SHALL NOT delay interaction, and SHALL change instantly when the visitor prefers reduced motion.

#### Scenario: Reduced motion
- **WHEN** the visitor prefers reduced motion and toggles the theme
- **THEN** colours change instantly without a transition

### Requirement: Performance and layout stability
Adding theming SHALL NOT reduce any Lighthouse mobile category below 90 and SHALL NOT cause layout shift when the theme is toggled or restored.

#### Scenario: Lighthouse after theming
- **WHEN** Lighthouse runs on the production preview in each theme on a mobile profile
- **THEN** Performance, Accessibility, Best Practices and SEO are each 90 or higher and cumulative layout shift is 0
