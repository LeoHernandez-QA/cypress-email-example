//import { recurse } from 'cypress-recurse'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fetchMailinatorInbox', (receiver) => {
  cy.fixture('fetchmessages.json').then((fetchedMessages) => {
    cy.intercept(`${Cypress.env('MAILINATOR_API_URL')}/*`, fetchedMessages)
  })

  receiver = receiver.substring(0, receiver.indexOf('@'))
  const fullApiUrl = `${Cypress.env('MAILINATOR_API_URL')}/${receiver}?token=${Cypress.env('MAILINATOR_API_TOKEN')}` //add &limit=1

  
  /*
  cy.request({
    method: `GET`,
    url: fullApiUrl
  }).then((response) => {
    const messageId = response.body.msgs.find(messageId => response.body.msgs.seconds_ago < 20)
    console.log(messageId)
  })*/
})
