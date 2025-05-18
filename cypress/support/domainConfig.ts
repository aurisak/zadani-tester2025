/**
 * Domain configuration for Faktura Online
 * Handles domain-specific settings and credentials
 */

// Configuration interface for each domain
export interface DomainConfig {
  email: string;
  password: string;
  baseUrl: string;
  loginPath: string;
}

// Define domain type for better type safety
export type DomainType = "cz" | "com" | "sk";

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
    },
    com: {
      email: Cypress.env("COM_EMAIL") || "",
      password: Cypress.env("COM_PASSWORD") || "",
      baseUrl: "https://staging.invoiceonline.com",
      loginPath: "/login",
    },
    sk: {
      email: Cypress.env("SK_EMAIL") || "",
      password: Cypress.env("SK_PASSWORD") || "",
      baseUrl: "https://staging.fakturaonline.sk",
      loginPath: "/prihlasenie",
    },
  };

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
  getBaseUrls(): Record<DomainType, string> {
    return {
      cz: this.configs.cz.baseUrl,
      com: this.configs.com.baseUrl,
      sk: this.configs.sk.baseUrl,
    };
  }

  /**
   * Get login paths for all domains
   * @returns Object with domain codes as keys and login paths as values
   */
  getLoginPaths(): Record<DomainType, string> {
    return {
      cz: this.configs.cz.loginPath,
      com: this.configs.com.loginPath,
      sk: this.configs.sk.loginPath,
    };
  }
}

// Create and export a singleton instance
const domainConfig = new DomainConfigurator();
export default domainConfig;
