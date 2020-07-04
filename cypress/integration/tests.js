/// <reference types="cypress"/>

const URL = "192.168.0.103:8080";

context("WW2 card picker", () => {
  const totalCardNumber = 12;
  const tempIdForCards = () => Cypress._.random(1, 6);
  const id = tempIdForCards();
  const randomCard = `#card-${id}`;
  const randomImageSource = `img/card-${id}.jpg`;

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
        .should("have.css", "opacity", "0");
      cy.get(randomCard)
        .should("have.attr", "src")
        .should("include", randomImageSource);
    });

    it("Ok now complete the game and make sure there is a SUCCESS alert", () => {
      cy.get(`[src="img/card-1.jpg"]`).click({ multiple: true });
      cy.get(`[src="img/card-2.jpg"]`).click({ multiple: true });
      cy.get(`[src="img/card-3.jpg"]`).click({ multiple: true });
      cy.get(`[src="img/card-4.jpg"]`).click({ multiple: true });
      cy.get(`[src="img/card-5.jpg"]`).click({ multiple: true });
      cy.get(`[src="img/card-6.jpg"]`).click({ multiple: true });
      cy.get("#score");
      cy.contains("ITS DONE! in 6 rounds")
        .should("be.visible")
        .should("have.class", "alert alert-danger");
    });
  });
  describe("makes sure RESET GAME works after game finished", () => {
    it("makes sure RESET button workd", () => {
      cy.get("#reset-button").click();
    });
    it("And start again with first test MAKES SURE THERE IS A BOARD and game is ready to play", () => {
      cy.get("[data-cy=container]")
        .find(".cuadro")
        .should("have.length", totalCardNumber);
      cy.get("[data-cy=container]")
        .find(".card")
        .should("have.length", totalCardNumber);
      cy.get(".card").should("not.have.attr", "src");
    });
  });
});
