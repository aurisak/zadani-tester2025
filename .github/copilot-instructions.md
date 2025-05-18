You are developing and maintaining frontend end-to-end (E2E) tests using Cypress and TypeScript, employing the Page Object Model (POM) design pattern. Your implementation should adhere to the following code standards and best practices:

# General Guidelines

### 1. 🎯 **Task Objective**

You are tasked with writing Cypress E2E tests for the **"Faktura Online"** of a web application deployed on multiple domains. Focus on:

* Addressing **form field differences** across domains.
* Ensuring **maintainable, domain-specific logic**.
* Demonstrating **clean code structure and reusability**.

### 2. 🌐 **Domains Under Test**

* `staging.fakturaonline.cz`
* `staging.invoiceonline.com`
* `staging.fakturaonline.sk`

Each domain might feature a **different set of form fields** (e.g., “DIČ” may exist only on certain domains).

### 3. 🛠 **Testing Environment Requirements**

* Use **Cypress** (TypeScript or JavaScript).
* Implement **Page Object Model**.
* Separate **test data via fixtures** and **domain-specific configuration**.
* Avoid using **test-specific HTML IDs** — rely on **CSS selectors and HTML structure**.

### 4. **Code Structure & Logic Separation**

* Clearly **segment logic per domain**.
* Detect domain from base URL and load matching configuration.
* Dynamically adjust form interaction based on available fields.

### 5. **Selectors Strategy**

* Use robust selectors derived from **visible text, attributes, or element hierarchy**.
* Avoid reliance on test IDs or brittle selectors.

### 6. **Reusability & DRY Principle**

* Encapsulate repeated actions (e.g., field filling, submission) in reusable functions.
* Abstract domain-specific overrides cleanly.

### 7. **Fixtures & Configuration**

* Maintain **one fixture/config file per domain**.
* Store expected fields, input values, and validation expectations separately.

# 📏 Code Standards: Cypress Page Object Model (POM) with TypeScript

1. **Project Structure:**

   - Organize your project with a clear and maintainable directory structure:
     - Place all page object classes within the `cypress/support/pageObjects/` directory.
     - Store test specifications in the `cypress/e2e/` directory.
     - Keep reusable utilities and custom commands in the `cypress/support/` directory.

2. **Page Object Classes:**

   - Create a separate class for each distinct page or component in your application.
   - Encapsulate all selectors and related actions within these classes.
   - Use TypeScript's `class` syntax to define page objects, ensuring type safety and IntelliSense support.
   - Export each class as a default export to facilitate straightforward imports.

3. **Selectors and Locators:**

   - Prioritize selectors that reflect how users interact with your application, enhancing test resilience and accessibility. Follow this order of preference:

     1. **getByRole**: Use to query elements exposed in the accessibility tree. Ideal for buttons, links, and other interactive elements.
     2. **getByLabelText**: Best for form fields, matching the label text associated with inputs.
     3. **getByPlaceholderText**: Useful when labels are absent but placeholders are present.
     4. **getByText**: Suitable for elements identifiable by their text content.
     5. **getByDisplayValue**: Applicable for form elements with pre-filled values.
     6. **getByAltText**: For images and elements with alt attributes.
     7. **getByTitle**: When elements have a title attribute.
     8. **getByTestId**: Use as a last resort when other selectors are not feasible.

   - Define selectors as private properties within the class to prevent external manipulation.
   - Avoid using complex CSS selectors or XPath expressions that are brittle and prone to breakage.

4. **Actions and Methods:**

   - Implement public methods within your page object classes to perform actions on the page (e.g., `login`, `fillForm`, `clickSubmit`).
   - These methods should abstract the underlying Cypress commands, providing a clear and concise API for test scripts.
   - Ensure methods return the page object instance (`this`) to allow method chaining where appropriate.

5. **Test Scripts:**

   - Import and instantiate page object classes within your test specifications.
   - Interact with the application exclusively through the methods provided by the page objects, avoiding direct use of Cypress commands in test scripts.
   - Structure tests using `describe` and `it` blocks, with descriptive names that clearly convey the purpose of each test.([perfecto.io][1])

6. **TypeScript Integration:**

   - Leverage TypeScript's features such as interfaces and types to define the shape of data used in tests and page objects.
   - Enable strict typing in your `tsconfig.json` to catch type-related errors during development.
   - Use TypeScript's `enum` or `const` assertions for defining sets of related constants (e.g., user roles, form field names).

7. **Code Reusability and Maintenance:**

   - Abstract common actions and utilities into separate helper functions or custom commands to promote code reuse.
   - Regularly review and refactor page objects and test scripts to eliminate duplication and improve clarity.
   - Maintain a consistent coding style throughout the project, adhering to a shared set of linting and formatting rules.

8. **Error Handling and Assertions:**

   - Incorporate meaningful assertions within your page object methods to verify that actions have the expected outcomes.
   - Implement error handling to provide informative messages when tests fail, aiding in quicker diagnosis and resolution.
   - Use Cypress's built-in retry-ability to handle transient issues, avoiding arbitrary waits or timeouts.

9. **Documentation and Comments:**

   - Document the purpose and usage of each page object class and its methods using JSDoc comments.
   - Provide high-level overviews of test suites and individual tests to explain their objectives and scope.
   - Keep documentation up to date with code changes to ensure accuracy and usefulness.

10. **Continuous Integration and Reporting:**

    - Integrate your test suite with a continuous integration (CI) system to run tests automatically on code changes.
    - Generate and store test reports and artifacts (e.g., screenshots, videos) to facilitate debugging and quality assurance.
    - Monitor test results regularly to identify and address flaky tests or recurring failures.

**Example:**

```typescript
// cypress/support/pageObjects/LoginPage.ts
class LoginPage {
  private usernameInput = () => cy.findByLabelText("Username")
  private passwordInput = () => cy.findByLabelText("Password")
  private loginButton = () => cy.findByRole("button", { name: /log in/i })

  public enterUsername(username: string): this {
    this.usernameInput().type(username)
    return this
  }

  public enterPassword(password: string): this {
    this.passwordInput().type(password)
    return this
  }

  public clickLogin(): this {
    this.loginButton().click()
    return this
  }
}

export default LoginPage
```

```typescript
// cypress/e2e/login.spec.ts
import LoginPage from "../support/pageObjects/LoginPage"

describe("Login Functionality", () => {
  const loginPage = new LoginPage()

  it("should log in with valid credentials", () => {
    cy.visit("/login")
    loginPage
      .enterUsername("testuser")
      .enterPassword("securepassword")
      .clickLogin()

    cy.url().should("include", "/dashboard")
  })
})
```

By following these guidelines, you will create a robust, maintainable, and scalable E2E testing framework using Cypress and TypeScript, leveraging the Page Object Model and accessibility-focused selectors to their fullest potential.

--- 

# 📏 Code Standards: Testing Library Cypress Selector Rules

## 🎯 Objective

Establish consistent, semantic, and accessible querying practices in Cypress tests using Testing Library. This ensures your tests reflect real user interactions and remain resilient to UI changes.

## 🛠️ Rule: Follow the Recommended Selector Priority

Use selectors in the **priority order** defined by Testing Library. Prefer queries that are closest to how users interact with the application.

### **Selector Priority Hierarchy** (Best to Worst):

| Priority | Selector Type          | Description                                  |
| -------- | ---------------------- | -------------------------------------------- |
| 1️⃣       | `getByRole`            | Accessible roles (e.g., `button`, `textbox`) |
| 2️⃣       | `getByLabelText`       | Elements associated with labels              |
| 3️⃣       | `getByPlaceholderText` | Placeholder text in inputs                   |
| 4️⃣       | `getByText`            | Visible text in the DOM                      |
| 5️⃣       | `getByDisplayValue`    | Current value of form elements               |
| 6️⃣       | `getByAltText`         | `alt` text in images                         |
| 7️⃣       | `getByTitle`           | Title attribute                              |
| 8️⃣       | `getByTestId`          | **Last resort only** — not user-facing       |

---

## ✅ Standards

- Always **prefer semantic queries** that match how users interact with your UI.
- Use `getByTestId` **only when no better semantic option is available**.
- Avoid relying on CSS classes, DOM structure, or non-accessible attributes.
- Ensure labels and roles are correctly implemented in the component so better selectors can be used.
- Use `findBy*` for async elements; `getBy*` for synchronous ones.

---

## 🚫 Non-Compliant Examples

```js
// 🚫 Bad: Relies on test ID unnecessarily
cy.getByTestId("submit-button")
```

```js
// 🚫 Bad: Uses CSS class
cy.get(".button-primary")
```

---

## ✅ Compliant Examples

```js
// ✅ Good: Uses role and accessible name
cy.findByRole("button", { name: /submit/i })
```

```js
// ✅ Good: Uses label text for form control
cy.findByLabelText("Email Address")
```
