import { recurse } from 'cypress-recurse'
import * as fetchedMessages from '../fixtures/fetchmessages.json'

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

  const teste = receiver.substring(0, receiver.indexOf('@'))
  const getInboxUrl = `${Cypress.env('MAILINATOR_API_URL')}/inboxes/${teste}?token=${Cypress.env('MAILINATOR_API_TOKEN')}` //add &limit=1
  const getMessageUrl = `${Cypress.env('MAILINATOR_API_URL')}/messages`

  const messageData = fetchedMessages.msgs.find(
    (
      email
    ) =>
      email.subject == "Confirmation code" &&
      email.seconds_ago == 281  // < 20
  )

  /*
  cy.request({
    method: 'GET',
    url: getInboxUrl
  }).then((response) => {
    const messageId = response.body.msgs.find(messageId => response.body.msgs.seconds_ago < 20)
    console.log(messageId)
  })*/

  return cy.request({
    method: 'GET',
    url: `${getMessageUrl}/${messageData.id}?token=${Cypress.env('MAILINATOR_API_TOKEN')}`,
  }).then((response) => {
    expect(response.status).eq(200)
    cy.wrap(JSON.stringify(response.body.parts).match(/code is (?<code>\w+)/), { log: false }).its('groups.code', { log: false })
  })
})
