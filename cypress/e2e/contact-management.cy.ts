import LoginPage from "../support/pageObjects/LoginPage";

describe("Contact Management in Faktura Online", () => {
  it("should allow users to login successfully", () => {
    LoginPage.visit();

    LoginPage.login();

    LoginPage.verifyLoginSuccess();
  });
});
