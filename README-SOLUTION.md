# Faktura Online Cross-Domain Tests

This project implements end-to-end tests for the Faktura Online application across multiple domains (CZ, COM, SK) using Cypress with TypeScript and the Page Object Model pattern.

## Solution Overview

The implementation demonstrates:

- Multi-domain testing architecture with domain-specific configuration
- Page Object Model for clean, maintainable test code
- Internationalization support for handling different languages
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

```bash
# Run tests in Cypress GUI
yarn cy:open

# Run tests for all domains
yarn test:all

# Run tests for specific domains
yarn test:cz
yarn test:com
yarn test:sk
```

## Project Structure

```
├── cypress/
│   ├── e2e/                    # Test specifications
│   ├── fixtures/               # Test data
│   └── support/                # Test support files
│       ├── commands.ts         # Custom commands
│       ├── domainConfig.ts     # Domain configuration
│       ├── i18n/               # Internationalization
│       └── pageObjects/        # Page Object Model classes
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
