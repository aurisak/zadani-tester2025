/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to login to the application
     * @param email - Email to use for login (optional, will use environment variables if not provided)
     * @param password - Password to use for login (optional, will use environment variables if not provided)
     * @example
     * cy.login()
     * cy.login('test@example.com', 'password')
     */
    login(email?: string, password?: string): Chainable<void>;
  }
}
