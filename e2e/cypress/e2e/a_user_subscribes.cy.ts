describe("a user can subscribe to my newsletter", () => {
  before(() => {
    cy.task("recreateOutputDirectory");
    cy.task("clearDatabase");
  });

  it("loads the ui and type into the form", () => {
    const expectedEmail = "webdevcody@gmail.com";
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="email-input"]').type(expectedEmail);
    cy.get('[data-testid="subscribe-button"]').click();
    cy.url().should("eq", "http://localhost:3000/success");

    cy.task("getSentEmails").then((emails) => {
      const sentEmails = emails as { headers: string; html: string }[];
      expect(sentEmails.length).eq(1);
      const theSentEmail = sentEmails[0];
      if (!theSentEmail)
        throw new Error("email was not found but expected one to exist");

      expect(theSentEmail.headers.includes(`To Address: ${expectedEmail}\n`)).to
        .be.true;

      const regex =
        /http:\/\/localhost:3000\/unsubscribe\/([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})/;
      const matchedString = theSentEmail.html.match(regex);
      if (!matchedString)
        throw new Error("unsubscribe link not found in email");
      const unsubscribeUrl = matchedString[0];
      const unsubscribeId = matchedString[1];
      if (!unsubscribeUrl)
        throw new Error("unsubscribe link not found in email");
      cy.visit(unsubscribeUrl);

      cy.get('[data-testid="unsubscribe-status"]').should(
        "contain",
        "successfully unsubscribed!"
      );

      cy.task("getSubscriberByEmail", expectedEmail).then((subscriber) => {
        expect(subscriber).to.be.null;
      });
      cy.task("getSubscriber", unsubscribeId).then((subscriber) => {
        expect(subscriber).to.be.null;
      });
    });
  });
});

export {};
