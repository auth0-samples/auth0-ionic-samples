// https://docs.cypress.io/api/introduction/api.html

describe("Page Loads", () => {
  it("renders page", () => {
    cy.visit("/");
    cy.contains(".toolbar-title-default", "Auth0 Vue Sample");
  });

  it("shows login", () => {
    cy.visit("/");
    cy.contains("Log in");
  });
});
