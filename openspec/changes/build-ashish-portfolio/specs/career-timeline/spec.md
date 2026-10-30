# Spec Delta

## Purpose

Defines how professional experience and education are presented as an interactive timeline so recruiters can scan career progression and impact quickly.

## ADDED Requirements

### Requirement: Experience timeline content
The Experience section SHALL list, in reverse chronological order, Omnicom Media Group (Lead Software Engineer, 06/2021 - Present, Gurugram), Cognizant (Software Engineer, 02/2019 - 05/2021, Bengaluru) and Cognizant (Jr. Software Engineer, 02/2018 - 02/2019, Bengaluru), each with its title, dates, location and resume achievements.

#### Scenario: Order and fields
- **WHEN** a visitor views the Experience section
- **THEN** the three roles appear newest first, each showing title, company, date range and location

#### Scenario: Current role
- **WHEN** the role has no end date
- **THEN** its range reads "Present" and it is visually marked as current

### Requirement: Projects grouped under roles
Each role SHALL group its projects as in the resume: Omnicom - Q Cultural Insights (QCore), Q-Assist, Q-Sparks; Cognizant Software Engineer - Telstra Prepaid Recharge, Boost Prepaid Recharge; Cognizant Jr. Software Engineer - Asset Management App.

#### Scenario: Project bullets
- **WHEN** a role entry is expanded
- **THEN** each of its projects is shown with a short description and its achievement bullets

### Requirement: Expandable entries
Role entries SHALL be expandable and collapsible, with the most recent role expanded by default, and the control SHALL be keyboard operable and expose its expanded state to assistive technology.

#### Scenario: Toggle with keyboard
- **WHEN** a keyboard user focuses a role header and presses Enter or Space
- **THEN** the entry toggles and its expanded state is announced

#### Scenario: Default state
- **WHEN** the section first renders
- **THEN** the Omnicom role is expanded and the Cognizant roles are collapsed

### Requirement: Scroll-linked timeline progress
The timeline SHALL show a vertical progress line and role markers that animate as the visitor scrolls, and SHALL render as a simple static list when reduced motion is preferred.

#### Scenario: Progress animation
- **WHEN** the visitor scrolls through the timeline with motion enabled
- **THEN** the line fills and markers activate as each role enters view

### Requirement: Impact highlights
Achievements SHALL highlight key technologies and outcomes (for example React 18, TypeScript, Webpack 5, OpenTelemetry, OAuth, code-splitting) as emphasised terms, using only claims present in the resume.

#### Scenario: No unsupported claims
- **WHEN** content is reviewed against the resume
- **THEN** every metric, technology and outcome shown appears in the resume

### Requirement: Education entry
The Education section SHALL show SRM University, B.Tech (Computer Science Engineering), 2013-2017, Chennai.

#### Scenario: Education content
- **WHEN** a visitor reaches the Education section
- **THEN** the degree, institution, years and city are shown
