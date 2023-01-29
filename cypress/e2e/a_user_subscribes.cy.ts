describe("a user can subscribe to my newsletter", () => {
  it("loads the ui and type into the form", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="email-input"]').type("webdevcody@gmail.com");
    cy.get('[data-testid="subscribe-button"]').click();
    cy.url().should("eq", "http://localhost:3000/success");
  });
});

export {};
