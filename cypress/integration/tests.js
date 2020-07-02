/// <reference types="cypress"/>

const URL = "192.168.0.103:8080";

context("WW2 card picker", () => {
  const totalCardNumber = 12;
  before(() => {
    cy.visit(URL);
  });

  describe("makes sure PAGE IS OK AT LOADING", () => {
    it("makes sure there is a BOARD", () => {
      cy.get("[data-cy=container]")
        .find(".cuadro")
        .should("have.length", totalCardNumber);
      cy.get("[data-cy=container]")
        .find(".card")
        .should("have.length", totalCardNumber);
      cy.get(".card").should("not.have.attr", "src");
    });
    it("makes sure is a WELCOME MESSAGE", () => {
      cy.get("#score")
        .should("be.visible")
        .should("have.class", "text-center text-warning");
    });
    it("makes sure the BUTTONS are ok", () => {
      cy.get("#start-button").should("be.visible");
      cy.get("#reset-button").should("be.visible");
    });
  });
  describe("makes sure GAME PLAYING is OK", () => {
    it("makes sure CARDS ARE HIDDEN AND DEPLOYED RANDOM when Start button pressed", () => {
      cy.get("#start-button").click();
      cy.get("[data-cy=container]")
        .find("img")
        .should("have.length", totalCardNumber)
        .should("be.visible")
        .should('have.css', 'opacity', '0')
      cy.get("#card-4")
        .should("have.attr", "src")
        .should("include", "card-4.jpg");
      cy.get("#card-5")
        .should("have.attr", "src")
        .should("include", "card-5.jpg");
    });
  });
});
