// Import the type definitions
/// <reference path="./index.d.ts" />

// Import Testing Library commands for better selectors
import "@testing-library/cypress/add-commands";
import domainConfig from "./domainConfig";
import { DomainType } from "./domainConfig";
import { getLanguage } from "./i18n";

/**
 * Custom command to login to the application
 * This command can be used in the Background steps of tests
 * Uses environment variables for credentials if not provided
 */
Cypress.Commands.add("login", (email?: string, password?: string) => {
  // Get the current domain from baseUrl
  const baseUrl = Cypress.config("baseUrl") as string;
  const domain = domainConfig.getDomainFromUrl(baseUrl);
  const config = domainConfig.getConfig(domain);
  const language = getLanguage();

  // Use provided credentials or get from environment variables via config
  const loginEmail = email || config.email;
  const loginPassword = password || config.password;

  // Verify we have credentials before proceeding
  if (!loginEmail || !loginPassword) {
    throw new Error(
      `Missing credentials for ${domain} domain. Please check your .env file or provide credentials as parameters.`
    );
  }

  // Navigate to login page
  const loginPaths: Record<DomainType, string> = {
    cz: "/prihlaseni",
    com: "/login",
    sk: "/prihlasenie",
  };

  cy.visit(loginPaths[domain]);

  // Get translations for the current domain from the language file
  const { emailPlaceholder, passwordPlaceholder, loginButton, heading } = {
    emailPlaceholder: language.login.emailPlaceholder,
    passwordPlaceholder: language.login.passwordPlaceholder,
    loginButton: language.login.loginButton,
    heading: language.login.heading,
  };

  // COM domain has an extra step to click "Log in to my account" button first
  if (domain === "com") {
    cy.findByRole("button", { name: heading }).click();
  }

  // Enter credentials and login
  cy.findByPlaceholderText(emailPlaceholder).type(loginEmail);
  cy.findByPlaceholderText(passwordPlaceholder).type(loginPassword);
  cy.findByRole("button", { name: loginButton }).click();

  // Verify login was successful by checking for a common element on the dashboard
  cy.url().should("not.include", loginPaths[domain]);
});
