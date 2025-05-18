// LoginPage class that implements the login functionality
import { BasePage } from "./BasePage";
// Fix the import path to use the correct relative path
import domainConfig from "../domainConfig";
import { DomainType } from "../domainConfig";

class LoginPage extends BasePage {
  // Use domainConfig to get login paths
  private readonly PATHS = domainConfig.getLoginPaths();

  private get formContainer() {
    return cy.get(".el-form");
  }

  private get emailInput() {
    return this.formContainer.findByPlaceholderText(
      this.language.login.emailPlaceholder
    );
  }

  private get passwordInput() {
    return this.formContainer.findByPlaceholderText(
      this.language.login.passwordPlaceholder
    );
  }

  private get loginButton() {
    return this.formContainer.findByRole("button", {
      name: this.language.login.loginButton,
    });
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
    // Clear all cookies, local storage, and session storage before visiting the login page
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    // Get current domain from the baseUrl
    const currentDomain = Cypress.config("baseUrl") as string;
    const domainType = domainConfig.getDomainFromUrl(currentDomain);

    // Get the correct login path for the current domain
    const path = this.PATHS[domainType];

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
   */
  login(): this {
    const currentDomain = domainConfig.getDomainFromUrl(
      Cypress.config("baseUrl") as string
    );
    const envPrefix = currentDomain.toUpperCase();
    const email = Cypress.env(`${envPrefix}_EMAIL`);
    const password = Cypress.env(`${envPrefix}_PASSWORD`);

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
