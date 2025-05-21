/**
 * Domain configuration for Faktura Online
 * Handles domain-specific settings and credentials
 */
// Add to your existing domainConfig file

export interface DomainFeatures {
  countrySelect: boolean;
  taxNumber: boolean;
  // Add other domain-specific features here
}

// Define domain type for better type safety
export type DomainType = "cz" | "com" | "sk";

/**
 * Domain configuration interface
 * Represents credentials and paths for a domain
 */
export interface DomainConfig {
  email: string;
  password: string;
  baseUrl: string;
  loginPath: string;
  contactPath: string;
  newContactPath: string;
}

/**
 * Domain configurator class
 * Handles domain-specific settings and provides methods to work with different domains
 */
class DomainConfigurator {
  // Domain configurations with environment variables for credentials
  private configs: Record<DomainType, DomainConfig> = {
    cz: {
      email: Cypress.env("CZ_EMAIL") || "",
      password: Cypress.env("CZ_PASSWORD") || "",
      baseUrl: "https://staging.fakturaonline.cz",
      loginPath: "/prihlaseni",
      contactPath: "/kontakty",
      newContactPath: "/kontakty/new",
    },
    com: {
      email: Cypress.env("COM_EMAIL") || "",
      password: Cypress.env("COM_PASSWORD") || "",
      baseUrl: "https://staging.invoiceonline.com",
      loginPath: "/login",
      contactPath: "/contacts",
      newContactPath: "/contacts/new",
    },
    sk: {
      email: Cypress.env("SK_EMAIL") || "",
      password: Cypress.env("SK_PASSWORD") || "",
      baseUrl: "https://staging.fakturaonline.sk",
      loginPath: "/prihlasenie",
      contactPath: "/kontakty",
      newContactPath: "/kontakty/new",
    },
  };

  // Features for each domain
  private domainFeatures: Record<DomainType, DomainFeatures> = {
    cz: {
      countrySelect: true,
      taxNumber: true,
    },
    com: {
      countrySelect: false,
      taxNumber: false,
    },
    sk: {
      countrySelect: true,
      taxNumber: true,
    },
  };
  DomainType: any;

  /**
   * Check if a domain has a specific feature
   * @param domain - Domain code ('cz', 'com', 'sk')
   * @param feature - Feature key
   * @returns boolean indicating if the feature is enabled for the domain
   */
  public hasDomainFeature(
    domain: DomainType,
    feature: keyof DomainFeatures
  ): boolean {
    return this.domainFeatures[domain][feature];
  }

  /**
   * Get configuration for a specific domain
   * @param domain - Domain code ('cz', 'com', 'sk')
   * @returns Domain configuration object
   */
  getConfig(domain: DomainType): DomainConfig {
    return this.configs[domain];
  }

  /**
   * Get domain from base URL
   * @param url - Base URL to extract domain from
   * @returns Domain code
   */
  getDomainFromUrl(url: string): DomainType {
    if (url.includes("fakturaonline.cz")) return "cz";
    if (url.includes("invoiceonline.com")) return "com";
    if (url.includes("fakturaonline.sk")) return "sk";
    return "cz"; // Default to cz
  }

  /**
   * Get domain configuration from base URL
   * @param url - Base URL to get config for
   * @returns Domain configuration object
   */
  getConfigFromUrl(url: string): DomainConfig {
    const domain = this.getDomainFromUrl(url);
    return this.getConfig(domain);
  }

  /**
   * Get base URLs for all domains
   * @returns Object with domain codes as keys and base URLs as values
   */
  getBaseUrl(): string {
    const domain = this.getCurrentDomain();
    return this.configs[domain].baseUrl;
  }

  /**
   * Get login path
   * @returns String with the login path for the current domain
   */
  getLoginPath(): string {
    const domain = this.getCurrentDomain();
    return this.configs[domain].loginPath;
  }

  /**
   * Get contacts path
   * @returns String with the contacts path for the current domain
   */
  getContactsPath(): string {
    const domain = this.getCurrentDomain();
    return this.configs[domain].contactPath;
  }

  /**
   * Get new contact path
   * @returns String with the new contact path for the current domain
   */
  getNewContactPath(): string {
    const domain = this.getCurrentDomain();
    return this.configs[domain].newContactPath;
  }

  /**
   * Get current domain type based on Cypress baseUrl configuration
   * @returns Current domain type ('cz', 'com', 'sk')
   */
  getCurrentDomain(): DomainType {
    const baseUrl = Cypress.config("baseUrl") as string;
    return this.getDomainFromUrl(baseUrl);
  }
}

// Create and export a singleton instance
const domainConfig = new DomainConfigurator();
export default domainConfig;
