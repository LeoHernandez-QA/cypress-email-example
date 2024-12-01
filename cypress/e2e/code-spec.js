// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Email confirmation', () => {

  it('sends an email with code', () => {
    const email = Cypress.env("MAIL_RECEIVER_ADDRESS")

    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type(email)
    cy.get('#company_size').select('3')
    cy.get('button[type=submit]').click()
    cy.location('pathname').should('equal', '/confirm')
    
    cy.fetchMailinatorInbox(email).then((code) => {
      cy.get('#confirmation_code').type(code)
      cy.get('button[type=submit]').click()
      cy.get('[data-cy=incorrect-code]').should('not.exist')
      cy.get('[data-cy=confirmed-code]').should('be.visible')
    })
  })
})
