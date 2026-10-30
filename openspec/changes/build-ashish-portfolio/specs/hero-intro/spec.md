# Spec Delta

## Purpose

Defines the landing hero and About section that introduce Ashish Kumar, communicate his role and value within seconds, and direct visitors to his work and contact options.

## ADDED Requirements

### Requirement: Hero identity and headline
The hero SHALL show the name "Ashish Kumar", the title "Lead Frontend Developer", a one-sentence value summary derived from the resume, and his photograph with descriptive alternative text.

#### Scenario: First impression
- **WHEN** a visitor lands on the site
- **THEN** the name, title, summary and photo are visible without scrolling on a 1280x720 viewport

#### Scenario: Photo fallback
- **WHEN** the photo fails to load
- **THEN** the layout remains intact and the alt text or initials placeholder is shown

### Requirement: Animated role line
The hero SHALL display a rotating or typed line of focus areas (for example React, TypeScript, Clean Architecture, AI-assisted development) that cycles automatically, and the full list SHALL remain available to assistive technology as static text.

#### Scenario: Role cycling
- **WHEN** the hero is in view with motion enabled
- **THEN** the line cycles through every focus area in a loop

#### Scenario: Reduced motion
- **WHEN** the visitor prefers reduced motion
- **THEN** the focus areas are shown statically without typing or cycling

### Requirement: Headline statistics
The hero SHALL show animated headline stats drawn from the resume: years of frontend experience (8+), number of products delivered, and primary stack (React, TypeScript).

#### Scenario: Counter animation
- **WHEN** the stats first enter the viewport with motion enabled
- **THEN** numeric values count up to their final values once

#### Scenario: Final values without motion
- **WHEN** reduced motion is preferred
- **THEN** the final values are shown immediately

### Requirement: Primary calls to action
The hero SHALL provide three actions: "View Work" (scrolls to Projects), "Download Resume" (downloads the resume PDF) and "Contact" (scrolls to Contact).

#### Scenario: View work
- **WHEN** the visitor selects "View Work"
- **THEN** the page scrolls to the Projects section

### Requirement: About section
The site SHALL include an About section that summarises Ashish's profile from the resume: 8+ years of experience, SOLID and Clean Architecture grounding, testing and performance focus, AI-assisted development with GitHub Copilot, and collaboration with product and UX teams.

#### Scenario: About content
- **WHEN** a visitor reaches the About section
- **THEN** the profile summary and a set of key strengths are shown, each traceable to the resume
