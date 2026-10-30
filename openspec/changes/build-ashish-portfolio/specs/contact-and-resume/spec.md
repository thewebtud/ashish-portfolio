# Spec Delta

## Purpose

Defines how visitors contact Ashish by email, phone and LinkedIn and obtain his resume, with contact details driven by configurable content data.

## ADDED Requirements

### Requirement: Contact section
The site SHALL include a Contact section with a call to action inviting opportunities and links for each configured contact channel: email (ashish.codes2@gmail.com), two phone numbers (8979513242 and 9625977569), LinkedIn (https://www.linkedin.com/in/devnextcubical/), and optionally GitHub.

#### Scenario: Email link
- **WHEN** the visitor selects the email action
- **THEN** their mail client opens with a new message addressed to ashish.codes2@gmail.com

#### Scenario: Phone links
- **WHEN** the visitor selects a phone number on a device that supports calling
- **THEN** the device starts a call to that number, and both numbers are visible as text

#### Scenario: Contact details visible
- **WHEN** a visitor views the Contact section
- **THEN** the email address, both phone numbers and the LinkedIn link are displayed

#### Scenario: External links
- **WHEN** the visitor selects a social link
- **THEN** it opens in a new tab with `noopener` and `noreferrer` protections

### Requirement: Configurable contact details
Contact details SHALL come from configurable content data, and any channel not configured SHALL NOT be rendered.

#### Scenario: Missing channel
- **WHEN** no GitHub URL is configured
- **THEN** no GitHub link or empty placeholder is rendered

#### Scenario: Removing a phone number
- **WHEN** a phone number is removed from the content data
- **THEN** it no longer appears on the page and no empty placeholder is rendered

### Requirement: Resume download
The site SHALL offer the resume PDF for download from the hero, navigation and Contact section, with a descriptive filename and file type indicated in the label.

#### Scenario: Download
- **WHEN** the visitor selects "Download Resume"
- **THEN** the browser downloads `Ashish_Kumar_Frontend_8Years.pdf`

#### Scenario: Asset available
- **WHEN** the production site is deployed
- **THEN** the resume URL returns the PDF with a successful response

### Requirement: Contact detail scraping protection
The email address and phone numbers SHALL NOT appear as literal strings in the built HTML file, and SHALL be rendered in the Contact section at runtime, to reduce scraping.

#### Scenario: Static HTML inspection
- **WHEN** the built HTML file is inspected
- **THEN** neither the email address nor any phone number is present as a literal string

#### Scenario: Rendered page
- **WHEN** the page has loaded in a browser
- **THEN** the email address and phone numbers are visible in the Contact section

### Requirement: Footer
The site SHALL include a footer with the name, the current year, a back-to-top control and links to the main sections.

#### Scenario: Back to top
- **WHEN** the visitor selects back-to-top
- **THEN** the page scrolls to the top and focus moves to the start of the page
