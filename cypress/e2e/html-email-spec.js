// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
    cy.intercept('/api/register').as('register')
  })

  it('sends an HTML email', () => {
    const email = Cypress.env("MAIL_RECEIVER_ADDRESS")

    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type(email)
    cy.get('#company_size').select(3)
    cy.get('button[type=submit]').click()

    cy.wait('@register');

    cy.location('pathname').should('equal', '/confirm')

    recurse(() => cy.task('getLastEmail', email), Cypress._.isObject, {
      log: false,
      delay: 2000,
      timeout: 20000,
    })
      .should('have.keys', ['body', 'html'])
      .its('html')
      .then((html) => {
        cy.document().invoke('write', html)
      })

    cy.contains('#message', '654agc')
      .should('be.visible')
      // I have added small wait to make sure the video shows the email
      // otherwise it passes way too quickly!
      .wait(2000)
    cy.contains('Confirm registration').click()
    cy.location('pathname').should('equal', '/confirm')
    cy.get('#confirmation_code').type('654agc')
    cy.get('button[type=submit]').click()
    cy.get('[data-cy=incorrect-code]').should('not.exist')
    cy.get('[data-cy=confirmed-code]').should('be.visible')
  })
})
