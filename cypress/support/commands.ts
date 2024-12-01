/// <reference types="cypress" />

export {};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      getStoryList(): Chainable<JQuery<HTMLElement>>;
      getStoryViewer(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getStoryList", () => {
  return cy.get("#user_story_preview");
});

Cypress.Commands.add("getStoryViewer", () => {
  return cy.get("#item_story");
});
