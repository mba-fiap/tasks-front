/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in with empty fields
     * @example cy.loginEmpty()
     */
    loginEmpty(): Chainable<void>

    /**
     * Custom command to log in with tasks
     * @example cy.loginWithTasks()
     */
    loginWithTasks(): Chainable<void>
  }
}
