import LoginPage from "../support/pageObjects/LoginPage";
import domainConfig from "../support/domainConfig";
import { DomainType } from "../support/domainConfig";

describe("Contact Management in Faktura Online", () => {
  (["cz", "com", "sk"] as const).forEach((domain) => {
    context(`Testing on ${domain} domain`, () => {
      before(() => {
        const baseUrl = domainConfig.getConfig(domain).baseUrl;
        Cypress.config("baseUrl", baseUrl);
      });

      beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
      });

      it("should allow users to login successfully", () => {
        LoginPage.visit();

        const envPrefix = domain.toUpperCase();
        const email = Cypress.env(`${envPrefix}_EMAIL`);
        const password = Cypress.env(`${envPrefix}_PASSWORD`);

        expect(
          email,
          `${envPrefix}_EMAIL environment variable must be set`
        ).to.be.a("string").and.not.be.empty;
        expect(
          password,
          `${envPrefix}_PASSWORD environment variable must be set`
        ).to.be.a("string").and.not.be.empty;

        LoginPage.enterEmail(email).enterPassword(password).clickLoginButton();

        LoginPage.verifyLoginSuccess();
      });
    });
  });
});
