// Import all language files
import csCZ from "./cs-CZ";
import enUS from "./en-US";
import skSK from "./sk-SK";

// Define the type for language objects
type LanguageStrings = typeof csCZ;

// Create a map of domains to language files
const languages: Record<string, LanguageStrings> = {
  "staging.fakturaonline.cz": csCZ,
  "staging.invoiceonline.com": enUS,
  "staging.fakturaonline.sk": skSK,
};

// Function to get language strings based on the current domain
export const getLanguage = (): LanguageStrings => {
  const domain = Cypress.config("baseUrl")?.replace(/^https?:\/\//, "") || "";
  return languages[domain as keyof typeof languages] || enUS; // Default to English if domain not found
};

export { csCZ, enUS, skSK };
