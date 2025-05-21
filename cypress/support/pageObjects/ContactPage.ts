// ContactPage class that implements the contact management functionality
import { BasePage } from "./BasePage";
import domainConfig from "../domainConfig";
//import domainConfig, { DomainType } from "../domainConfig";

class ContactPage extends BasePage {
  private get addNewContactButton() {
    return cy.findByRole("link", {
      name: this.language.contact.addNewContact,
    });
  }

  private get contactsPageTitle() {
    return cy.findByRole("heading", {
      name: this.language.contact.contactsPageTitle,
    });
  }

  private get formContainer() {
    return cy.get(".el-form");
  }

  // Form field selectors
  private get newContactTitle() {
    return cy.findByRole("heading", {
      name: this.language.contact.pageTitle,
    });
  }

  private get nameInput() {
    // Get current domain type
    const currentDomain = domainConfig.getDomainFromUrl(
      Cypress.config("baseUrl") as string
    );

    // Use different selectors based on domain type using switch
    switch (currentDomain) {
      case "com":
        return cy.get("#invoice_attributes_name");
      case "sk":
        // For SK domain, use findByText and parent
        return this.formContainer
          .findByText(this.language.contact.nameLabel)
          .parent();
      case "cz":
      default:
        // For CZ domain and any other domains, use findByPlaceholderText
        return this.formContainer.findByPlaceholderText(
          this.language.contact.namePlaceholder
        );
    }
  }

  private get companyNumberInput() {
    return cy.get("#invoice_attributes_company_number");
  }

  private get taxNumberInput() {
    return cy.get("#invoice_attributes_tax_number");
  }

  private get phoneInput() {
    return cy.get('input[type="tel"].vti__input');
  }

  private get emailInput() {
    return cy.get("#invoice_attributes_email");
  }

  private get webInput() {
    return cy.get("#invoice_attributes_web");
  }

  private get streetInput() {
    return cy.get("#invoice_attributes_address_attributes_street");
  }

  private get cityInput() {
    return cy.get("#invoice_attributes_address_attributes_city");
  }

  private get postcodeInput() {
    return cy.get("#invoice_attributes_address_attributes_postcode");
  }

  private get countrySelect() {
    return cy.get(
      "#invoice_contact_attributes_address_attributes_country_code"
    );
  }

  private get saveButton() {
    return cy.findByRole("button", {
      name: this.language.contact.saveButton,
    });
  }

  /**
   * Visits the contacts page
   */
  visitContacts(): this {
    super.visit(domainConfig.getContactsPath());

    // Verify the contacts page is loaded
    this.contactsPageTitle.should("be.visible");

    return this;
  }

  /**
   * Navigates to the new contact form
   */
  navigateToNewContactForm(): this {
    this.addNewContactButton.click();
    this.newContactTitle.should("be.visible");
    return this;
  }

  /**
   * Visits the new contact form directly
   */
  visitNewContactForm(): this {
    super.visit(domainConfig.getNewContactPath());

    // Verify the new contact form is loaded
    this.newContactTitle.should("be.visible");

    return this;
  }

  /**
   * Fills the contact form with the provided data
   * @param contactData - The contact data from fixture
   */
  fillContactForm(contactData: any): this {
    // Fill in the basic info
    this.nameInput.type(contactData.name);
    this.companyNumberInput.type(contactData.companyNumber);

    // Tax number may have different labels in different domains
    if (contactData.taxNumber) {
      this.taxNumberInput.type(contactData.taxNumber);
    }

    // Fill in contact details
    this.phoneInput.type(contactData.phone);
    this.emailInput.type(contactData.email);
    this.webInput.type(contactData.web);

    // Fill in address
    this.streetInput.type(contactData.address.street);
    this.cityInput.type(contactData.address.city);
    this.postcodeInput.type(contactData.address.postcode);

    // Select country - click on the country select input
    this.countrySelect.click();

    // Click on the country in the dropdown
    cy.contains(
      ".el-select-dropdown__item span",
      contactData.address.country
    ).click();

    return this;
  }

  /**
   * Submits the contact form
   */
  submitContactForm(): this {
    this.saveButton.click();

    // Wait for redirect to contacts list
    cy.url().should("include", domainConfig.getContactsPath());

    // Verify success - we should be back at the contacts list
    this.contactsPageTitle.should("be.visible");

    return this;
  }

  /**
   * Verifies that the contact was successfully created
   * @param contactName - The name of the created contact
   */
  verifyContactCreated(contactName: string): this {
    // Search for the contact in the list
    cy.contains("td", contactName).should("be.visible");

    return this;
  }
}

export default new ContactPage();
