# Spec Delta

## Purpose

Defines the skills section that presents Ashish's technical skills as grouped, logo-based, interactive items so recruiters can match his stack to a role.

## ADDED Requirements

### Requirement: Grouped skills
The Skills section SHALL present the resume's groups: Core Frontend, State Management & Data, Styling & UI Components, Testing & Quality, Monitoring & Analytics, Software Engineering Fundamentals and Ways of Working, each listing its skills.

#### Scenario: All groups present
- **WHEN** a visitor views the Skills section
- **THEN** all seven groups are shown with their skills

### Requirement: Technology logos
Each skill that has a recognisable technology brand (for example React, TypeScript, Redux, Jest, Docker, Tailwind CSS) SHALL be shown with its logo or icon alongside its name, and skills without a logo SHALL be shown as text chips.

#### Scenario: Logo with label
- **WHEN** a skill with a logo is displayed
- **THEN** the logo is paired with a visible text label

#### Scenario: Skill without logo
- **WHEN** a skill has no logo, such as "SOLID Principles"
- **THEN** it is shown as a styled text chip

### Requirement: Group filtering
The section SHALL let the visitor filter skills by group, with "All" selected by default, updating the visible skills with an animated transition.

#### Scenario: Filter by group
- **WHEN** the visitor selects "Testing & Quality"
- **THEN** only that group's skills are visible and the control shows its selected state

### Requirement: Interactive skill items
Skill items SHALL respond to hover and keyboard focus with a visual highlight, and the interaction SHALL NOT be the only way to read a skill's name.

#### Scenario: Hover and focus
- **WHEN** the visitor hovers or focuses a skill
- **THEN** a highlight effect is shown and the label stays readable

### Requirement: Primary stack emphasis
React, TypeScript and Clean Architecture SHALL be visually emphasised as primary skills.

#### Scenario: Emphasis
- **WHEN** the Skills section renders
- **THEN** primary skills are visually distinguished from other skills
