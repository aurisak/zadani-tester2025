// Import all language files
import csCZ from "./cs-CZ";
import enUS from "./en-US";
import skSK from "./sk-SK";

// Create a map of domains to language files
const languages = {
  "staging.fakturaonline.cz": csCZ,
  "staging.invoiceonline.com": enUS,
  "staging.fakturaonline.sk": skSK,
} as const;

// Function to get language strings based on the current domain
export const getLanguage = () => {
  const domain = Cypress.config("baseUrl")?.replace(/^https?:\/\//, "") || "";
  if (domain in languages) return languages[domain as keyof typeof languages];
  else {
    throw new Error(`Language file not found for domain: ${domain}`);
  }
};

export { csCZ, enUS, skSK };
