import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Set default domain - can be overridden in test commands
      // Use environment variables if available, otherwise default to CZ domain
      const domain = process.env.TEST_DOMAIN || "cz";
      const baseUrl = {
        cz: "https://staging.fakturaonline.cz",
        com: "https://staging.invoiceonline.com",
        sk: "https://staging.fakturaonline.sk",
      }[domain];

      config.baseUrl = baseUrl || "";

      // Pass environment variables to Cypress
      const envVars = {
        CZ_EMAIL: process.env.CZ_EMAIL,
        CZ_PASSWORD: process.env.CZ_PASSWORD,
        COM_EMAIL: process.env.COM_EMAIL,
        COM_PASSWORD: process.env.COM_PASSWORD,
        SK_EMAIL: process.env.SK_EMAIL,
        SK_PASSWORD: process.env.SK_PASSWORD,
      };

      // Add environment variables to config
      Object.entries(envVars).forEach(([key, value]) => {
        if (value) {
          config.env[key] = value;
        }
      });

      return config;
    },
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
