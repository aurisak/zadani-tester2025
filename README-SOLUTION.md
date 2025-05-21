# Faktura Online Cross-Domain Tests

This project implements end-to-end tests for the Faktura Online application across multiple domains (CZ, COM, SK) using Cypress with TypeScript and the Page Object Model pattern. Tests can run on a single domain at a time or dynamically across all domains.

## Solution Overview

The implementation demonstrates:

- Multi-domain testing architecture with domain-specific configuration
- Page Object Model for clean, maintainable test code
- Internationalization support for handling different languages
- Dynamic test generation for cross-domain testing
- Test fixtures for domain-specific test data
- Environment variable management for secure credential storage
- Robust selector strategies following Testing Library best practices

## Getting Started

### Prerequisites

- Node.js (version 18+)
- Yarn package manager

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```
3. Copy the environment variable template:
   ```
   cp .env.sample .env
   ```
4. Edit the `.env` file with your test credentials

### Configuration

The credentials for each domain are stored in environment variables to avoid hardcoding sensitive information in the codebase. The environment variables needed are:

- CZ domain: `CZ_EMAIL`, `CZ_PASSWORD`
- COM domain: `COM_EMAIL`, `COM_PASSWORD`
- SK domain: `SK_EMAIL`, `SK_PASSWORD`

### Running the Tests

The tests are configured to run on a single domain per test run, controlled by the `TEST_DOMAIN` environment variable:

```bash
# Run tests in Cypress GUI for Czech domain
TEST_DOMAIN=cz yarn cy:open

# Run tests in headless mode for specific domains
TEST_DOMAIN=cz yarn cy:run
TEST_DOMAIN=com yarn cy:run
TEST_DOMAIN=sk yarn cy:run
```

To make this easier, you can add these scripts to your package.json:

```json
"scripts": {
  "test:cz": "TEST_DOMAIN=cz cypress run",
  "test:com": "TEST_DOMAIN=com cypress run",
  "test:sk": "TEST_DOMAIN=sk cypress run",
  "cy:open:cz": "TEST_DOMAIN=cz cypress open"
}
```

## Project Structure

```
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   └── contact-management.cy.ts  # Contact management tests
│   ├── fixtures/               # Test data
│   │   ├── contact-cz.json     # Czech contact test data
│   │   ├── contact-com.json    # International contact test data
│   │   └── contact-sk.json     # Slovak contact test data
│   └── support/                # Test support files
│       ├── commands.ts         # Custom commands
│       ├── domainConfig.ts     # Domain configuration
│       ├── i18n/               # Internationalization
│       │   ├── cs-CZ.ts        # Czech translations
│       │   ├── en-US.ts        # English translations
│       │   └── sk-SK.ts        # Slovak translations
│       └── pageObjects/        # Page Object Model classes
│           ├── BasePage.ts     # Base page class
│           ├── ContactPage.ts  # Contact page implementation
│           └── LoginPage.ts    # Login page implementation
├── .env.sample                 # Environment variables template
├── cypress.config.ts           # Cypress configuration
└── package.json                # Project dependencies
```

## Implementation Details

### Page Objects

The tests use the Page Object Model pattern to encapsulate page-specific elements and actions, making tests more maintainable and readable.

### Domain Configuration

The application handles domain-specific differences through:

1. Dynamic domain detection based on the current baseUrl
2. Domain-specific configuration for paths and settings
3. Language files for translation strings

### Security

Credentials are stored in environment variables and accessed through a structured configuration system. No credentials are hardcoded in the repository.

## Contact Management Implementation

### Overview

The contact management tests demonstrate the ability to create new contacts across all three domains (CZ, SK, COM) while handling domain-specific differences in form fields, labels, and validation rules.

### Key Features

1. **Domain-specific contact data**:

   - Each domain has its own fixture file with appropriate data formats (e.g., different tax ID formats)
   - Country selection is handled dynamically based on the domain

2. **Robust selectors**:

   - Uses accessible roles, labels, and placeholders for robust element selection
   - Handles different field structures across domains

3. **Reusable methods**:

   - `createNewContact()` method encapsulates the entire contact creation flow
   - `fillContactForm()` handles domain-specific form differences

### Test Flow

The contact creation test follows this workflow:

1. Login to the application (domain-specific credentials)
2. Navigate to the contacts section
3. Click the "New Contact" button
4. Fill the contact form with domain-specific test data
5. Submit the form
6. Verify the contact was created successfully

### Handling Domain Differences

The implementation handles these key domain differences:

1. **Different URLs and paths**:

   - Domain-specific paths for contacts section (`/kontakty` vs `/contacts`)
   - Domain-specific new contact paths

2. **Different field labels**:

   - Translated field labels loaded from language files
   - Different tax ID formats (DIČ in CZ/SK vs VAT ID in COM)

3. **Different validation rules**:
   - Each domain has appropriate company IDs and tax IDs that pass validation
   - Address formats follow country-specific conventions
