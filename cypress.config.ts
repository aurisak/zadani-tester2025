import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Set domain based on TEST_DOMAIN environment variable
      // This controls which domain the tests will run against for the entire test run
      const testDomain = process.env.TEST_DOMAIN || "cz";
      console.log(`Running tests for domain: ${testDomain}`);

      // Map domain code to full base URL
      const baseUrl = {
        cz: "https://staging.fakturaonline.cz",
        com: "https://staging.invoiceonline.com",
        sk: "https://staging.fakturaonline.sk",
      }[testDomain];

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
