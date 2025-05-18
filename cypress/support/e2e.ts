// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import "./commands";

// Import Testing Library commands for better accessibility-based selectors
import "@testing-library/cypress/add-commands";

// Import domain configuration and page objects
import "./domainConfig";
import "./pageObjects/BasePage";
import "./pageObjects/LoginPage";

// Import i18n support
import "./i18n";

// Disable uncaught exception handling since some app frameworks handle errors internally
Cypress.on("uncaught:exception", (err) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
