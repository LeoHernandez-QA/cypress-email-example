/// <reference types="cypress" />

describe('Send real message', function () {
  beforeEach(function () {
    //TODO
  })

  it('first mail', function () {
    // the destination email
    const email = Cypress.env('MAIL_RECEIVER_ADDRESS')
    
    // call the API endpoint ourselves, which sends an email
    /*
    cy.request({
      url: '/api/register',
      method: 'POST',
      body: {
        name: 'Test User',
        email: email,
        companySize: '3',
      },
    })*/

    //cy.wait(5005);

    cy.fetchMailinatorInbox(email).then((response) => {
      cy.visit('/confirm')
      cy.get('#confirmation_code').type(response)
      cy.get('button[type=submit]').click()
      cy.get('[data-cy=incorrect-code]').should('not.exist')
      cy.get('[data-cy=confirmed-code]').should('be.visible')
    })
  })
})