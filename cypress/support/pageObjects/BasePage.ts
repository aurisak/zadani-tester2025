// Base page object class that all page objects will extend
import { getLanguage } from "../i18n";

export abstract class BasePage {
  protected language: any;

  constructor() {
    this.language = getLanguage();
  }

  /**
   * Visits the specified page
   * @param path - The path to visit
   */
  visit(path: string): this {
    cy.visit(path);
    return this;
  }

  /**
   * Gets the current domain
   * @returns The current domain (e.g., 'staging.fakturaonline.cz')
   */
  getDomain(): string {
    return Cypress.config("baseUrl")?.replace(/^https?:\/\//, "") || "";
  }

  /**
   * Checks if the current domain is the specified one
   * @param domain - The domain to check (e.g., 'com', 'cz', 'sk')
   */
  isDomain(domain: "com" | "cz" | "sk"): boolean {
    const currentDomain = this.getDomain();

    switch (domain) {
      case "com":
        return currentDomain.includes("invoiceonline.com");
      case "cz":
        return currentDomain.includes("fakturaonline.cz");
      case "sk":
        return currentDomain.includes("fakturaonline.sk");
      default:
        return false;
    }
  }
}
