// LoginPage class that implements the login functionality
import { BasePage } from "./BasePage";
// Fix the import path to use the correct relative path
import domainConfig from "../domainConfig";
import { DomainType } from "../domainConfig";

class LoginPage extends BasePage {
  // Use domainConfig to get login paths
  private readonly PATHS = domainConfig.getLoginPaths();

  private get emailInput() {
    return cy.findByPlaceholderText(this.language.login.emailPlaceholder);
  }

  private get passwordInput() {
    return cy.findByPlaceholderText(this.language.login.passwordPlaceholder);
  }

  private get loginButton() {
    return cy.findByRole("button", { name: this.language.login.loginButton });
  }

  private get loginFormButton() {
    return cy.findByRole("button", {
      name: this.language.login.loginFormButton,
    });
  }

  /**
   * Visits the login page
   */
  visit(): this {
    // Determine the correct path based on domain
    let path = this.PATHS.cz; // Default

    if (this.isDomain("com")) {
      path = this.PATHS.com;
    } else if (this.isDomain("sk")) {
      path = this.PATHS.sk;
    }

    super.visit(path);
    this.loginFormButton.click();

    return this;
  }

  /**
   * Enters the email in the email input field
   * @param email - The email to enter
   */
  enterEmail(email: string = Cypress.env("EMAIL")): this {
    // Use environment variables if no email is provided
    this.emailInput.type(email);
    return this;
  }

  /**
   * Enters the password in the password input field
   * @param password - The password to enter
   */
  enterPassword(password: string = Cypress.env("PASSWORD")): this {
    // Use environment variables if no password is provided
    this.passwordInput.type(password);
    return this;
  }

  /**
   * Clicks the login button
   * This method handles the two-step login process:
   * 1. First clicks the initial login button to navigate to the login page
   * 2. Then clicks the login form button to submit credentials
   */
  clickLoginButton(): this {
    this.loginButton.click();
    return this;
  }

  /**
   * Performs the login operation with the given credentials
   * @param email - The email to use
   * @param password - The password to use
   */
  login(email?: string, password?: string): this {
    return this.enterEmail(email).enterPassword(password).clickLoginButton();
  }

  /**
   * Verifies that the login was successful
   */
  verifyLoginSuccess(): this {
    // Check if user is redirected to the dashboard/home page after login
    // Use localized page title from translation files
    cy.findByRole("heading", {
      name: this.language.login.pageTitle,
      timeout: 10000,
    }).should("exist");
    return this;
  }
}

export default new LoginPage();
