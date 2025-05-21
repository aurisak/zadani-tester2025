import LoginPage from "../support/pageObjects/LoginPage";
import ContactPage from "../support/pageObjects/ContactPage";
import domainConfig from "../support/domainConfig";

describe("Contact Management in Faktura Online", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login();
    LoginPage.verifyLoginSuccess();
  });

  it("should create a new contact", () => {
    // Get current domain for fixture selection
    const currentDomain = domainConfig.getCurrentDomain();
    const fixtureFile = `contact-${currentDomain}.json`;

    // Create a new contact using the appropriate fixture for the current domain
    cy.fixture(fixtureFile).then((contactData) => {
      ContactPage.visitNewContactForm();
      ContactPage.fillContactForm(contactData);
      ContactPage.submitContactForm();
      ContactPage.verifyContactCreated(contactData.name);
    });

  });
});
