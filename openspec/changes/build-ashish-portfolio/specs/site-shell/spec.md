# Spec Delta

## Purpose

Defines the overall single-page portfolio experience: layout, navigation, visual identity, metadata, accessibility and performance baselines that all sections share.

## ADDED Requirements

### Requirement: Single-page portfolio structure
The site SHALL be a single-page application that renders the sections Hero, About, Experience, Projects, Skills, Education and Contact in that order on one scrollable page, without full page reloads between sections.

#### Scenario: All sections render
- **WHEN** a visitor loads the site root
- **THEN** every listed section is present in order and its content is visible after scrolling

#### Scenario: Unknown path
- **WHEN** a visitor opens a URL path that does not exist
- **THEN** the site serves the portfolio page rather than a blank or error page

### Requirement: Sticky navigation with scroll-spy
The site SHALL provide a navigation bar that stays visible while scrolling, links to each section, scrolls smoothly to the selected section, and highlights the link of the section currently in view.

#### Scenario: Navigate to a section
- **WHEN** the visitor selects "Projects" in the navigation
- **THEN** the page scrolls to the Projects section and the section heading is not hidden behind the navigation bar

#### Scenario: Active link follows scroll
- **WHEN** the visitor scrolls so that the Skills section occupies most of the viewport
- **THEN** the "Skills" navigation link is shown as active

#### Scenario: Deep link
- **WHEN** a visitor opens the site with a section fragment such as `#experience`
- **THEN** the page scrolls to that section on load

### Requirement: Responsive layout
The site SHALL be usable and visually correct from 320px to 1920px viewport width without horizontal scrolling, with a collapsible menu replacing the navigation links on narrow screens.

#### Scenario: Mobile menu
- **WHEN** the viewport is narrower than the tablet breakpoint and the visitor opens the menu
- **THEN** all section links are shown and selecting one closes the menu and scrolls to that section

#### Scenario: No horizontal overflow
- **WHEN** the site is viewed at 320px width
- **THEN** no section causes horizontal scrolling

### Requirement: Tech-themed visual identity
The site SHALL use a dark, technology-oriented visual theme with a consistent colour palette, monospace accent typography and code/terminal-inspired decorative elements across all sections.

#### Scenario: Consistent theme
- **WHEN** a visitor views any section
- **THEN** it uses the same palette, typography scale and component styling

### Requirement: Accessibility baseline
The site SHALL meet WCAG 2.1 AA: text contrast of at least 4.5:1, full keyboard operability with visible focus, semantic landmarks and headings, alternative text for meaningful images, and a "skip to content" link.

#### Scenario: Keyboard navigation
- **WHEN** a visitor uses only the keyboard
- **THEN** every interactive element is reachable in a logical order with a visible focus indicator

#### Scenario: Skip link
- **WHEN** a keyboard user presses Tab on page load
- **THEN** the first focusable element is a "skip to content" link that moves focus to the main content

#### Scenario: Decorative graphics hidden from assistive technology
- **WHEN** a screen reader traverses decorative backgrounds and effects
- **THEN** they are not announced

### Requirement: SEO and social metadata
The site SHALL declare a descriptive title, meta description, language attribute, favicon, and Open Graph and Twitter card metadata that identify Ashish Kumar as a Lead Frontend Developer.

#### Scenario: Link preview
- **WHEN** the site URL is shared on a platform that reads Open Graph tags
- **THEN** the preview shows the site title, description and a preview image

### Requirement: Performance baseline
A production build SHALL score at least 90 in Lighthouse Performance, Accessibility, Best Practices and SEO on a mobile profile, and below-the-fold heavy assets SHALL be loaded lazily.

#### Scenario: Lighthouse audit
- **WHEN** Lighthouse is run against the production preview on a mobile profile
- **THEN** each of the four category scores is 90 or higher

### Requirement: Content separate from presentation
All portfolio text, dates, lists and links SHALL come from structured content data so that content can change without editing presentation logic.

#### Scenario: Update an achievement
- **WHEN** a bullet in the content data is edited
- **THEN** the change appears on the page without any change to component code
