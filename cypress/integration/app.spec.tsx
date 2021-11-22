/// <reference types="cypress" />

it("should display heading", () => {
  cy.visit("http://localhost:3000");
  cy.findByRole("heading", { name: "Pantry Manager" });
});

it("should support addeding and deleting a food", () => {
  cy.visit("http://localhost:3000");
  cy.findByText("Create Food").click();
  cy.findByLabelText("Name").type("Cucumber");
  cy.findByLabelText("Type").select("Fruit");
  cy.findByText("Save Food").click();
  cy.findByLabelText("Delete Cucumber").click();
  cy.findByLabelText("Delete Cucumber").should("not-exist");
});
