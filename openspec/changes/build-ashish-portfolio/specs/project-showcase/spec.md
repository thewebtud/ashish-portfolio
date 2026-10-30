# Spec Delta

## Purpose

Defines the projects section that presents each product Ashish has worked on as an interactive card and detail view, using resume-level information only.

## ADDED Requirements

### Requirement: Project cards
The Projects section SHALL show one card for each of Q Cultural Insights (QCore), Q-Assist, Q-Sparks, Telstra Prepaid Recharge, Boost Prepaid Recharge and Asset Management App, each with its name, one-line description, domain tag and key technologies.

#### Scenario: All projects listed
- **WHEN** a visitor views the Projects section
- **THEN** six cards are shown with name, description, tags and technologies

### Requirement: Featured AI products
Q-Assist (GPT-4 chatbot) and Q-Sparks (AI creative-briefing tool) SHALL be marked "AI" and visually featured, and Q Cultural Insights SHALL be marked as the flagship platform.

#### Scenario: Featured indicators
- **WHEN** the cards render
- **THEN** the AI and flagship badges are shown on the relevant cards

### Requirement: Project filtering
The section SHALL provide filters by category (All, AI, SaaS, Consumer, Enterprise) that update the visible cards with an animated transition and report the result count to assistive technology.

#### Scenario: Filter by AI
- **WHEN** the visitor selects the "AI" filter
- **THEN** only Q-Assist and Q-Sparks remain visible

#### Scenario: Empty state
- **WHEN** a filter matches no projects
- **THEN** a message states that no projects match

### Requirement: Project detail view
Selecting a card SHALL open a detail view with the product summary, the role Ashish played, resume highlights, the technology stack and the employer, and it SHALL be closable with a close button, the Escape key or a backdrop click.

#### Scenario: Open and close
- **WHEN** the visitor selects a card and then presses Escape
- **THEN** the detail view opens and then closes, and focus returns to the originating card

#### Scenario: Focus management
- **WHEN** the detail view is open
- **THEN** keyboard focus is kept within it and background content is inert for assistive technology

### Requirement: Confidentiality of proprietary work
Project content SHALL NOT include internal screenshots, internal URLs, client data or metrics that are not in the resume.

#### Scenario: Content review
- **WHEN** project content is reviewed
- **THEN** it contains only resume-level descriptions and generic illustrative graphics
