import { TSubscription } from "@wdc-newsletter/business";

const baseUrl = Cypress.env("BASE_URL") || "http://localhost:3000";

describe("a user can subscribe to my newsletter", () => {
  before(() => {
    cy.task("recreateOutputDirectory");
    cy.task("clearDatabase");
  });

  it("loads the ui and type into the form", () => {
    const expectedEmail = "webdevcody@gmail.com";
    cy.visit("/");
    cy.get('[data-testid="email-input"]').type(expectedEmail);
    cy.get('[data-testid="subscribe-button"]').click();
    cy.url().should("include", "/success");

    cy.task("getSubscriberByEmail", expectedEmail).then(
      (subscriber: TSubscription) => {
        expect(subscriber).to.not.be.undefined;
        cy.visit(`/unsubscribe/${subscriber.unsubscribeId}`);

        cy.get('[data-testid="unsubscribe-status"]').should(
          "contain",
          "successfully unsubscribed!"
        );

        cy.task("getSubscriberByEmail", expectedEmail).then((subscriber) => {
          expect(subscriber).to.be.null;
        });
      }
    );
  });
});

export {};
