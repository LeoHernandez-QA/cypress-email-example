/// <reference types="cypress" />

describe('Send real message', function () {
  // The destination email
  const email = Cypress.env('MAIL_RECEIVER_ADDRESS')

  beforeEach(function () {
    cy.intercept('POST', '/api/register').as('register')
  })

  it('Request confirmation message by API and confirm', function () {
    // Call the API endpoint ourselves, which sends an email
    cy.request({
      url: '/api/register',
      method: 'POST',
      body: {
        name: 'Test User',
        email: email,
        companySize: '3',
      },
    })
    // Call a custom command to extract the code from the email message
    cy.fetchMailinatorInbox(email).then((code) => {
      cy.visit('/confirm')
      cy.get('#confirmation_code').type(code)
      cy.get('button[type=submit]').click()
      cy.get('[data-cy=incorrect-code]').should('not.exist')
      cy.get('[data-cy=confirmed-code]').should('be.visible')
    })
  })

  it('Request confirmation message by UI and confirm', () => {
    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type(email)
    cy.get('#company_size').select('3')
    cy.get('button[type=submit]').click()
    cy.location('pathname').should('equal', '/confirm')

    cy.wait('@register').then((response) => {
      expect(response.response.body).deep.eq({ name: 'Joe Bravo', email: email })
      expect(response.request.body).deep.eq({ name: 'Joe Bravo', email: email, companySize: '3', })
    })

    cy.fetchMailinatorInbox(email).then((code) => {
      cy.get('#confirmation_code').type(code)
      cy.get('button[type=submit]').click()
      cy.get('[data-cy=incorrect-code]').should('not.exist')
      cy.get('[data-cy=confirmed-code]').should('be.visible')
    })

    cy.wait(1000)
  })
})