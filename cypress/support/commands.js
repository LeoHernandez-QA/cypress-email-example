import { recurse } from 'cypress-recurse'

/**
 * Custom command that contains a recursive function that
 * waits the email message to arrive and then retrieves the
 * confirmation code from the body. 
 */
Cypress.Commands.add('fetchMailinatorInbox', (receiver, timeout = 15000, interval = 5000) => {

  // Extracts the part of the registered e-mail that comes before the '@'
  const emailPrefix = receiver.substring(0, receiver.indexOf('@'))
  const getInboxUrl = `${Cypress.env('MAILINATOR_API_URL')}/inboxes/${emailPrefix}?token=${Cypress.env('MAILINATOR_API_TOKEN')}`
  const getMessageUrl = `${Cypress.env('MAILINATOR_API_URL')}/messages`
  const endTime = Date.now() + timeout

  //Explicity wait 'till message arrives
  cy.wait(5000);

  // Recursive function
  function getMessage() {    
    // Retrieves a list of messages summaries.
    // We only need the ID.
    return cy.request({
      method: 'GET',
      url: getInboxUrl,
      retryOnNetworkFailure: true,
      retryOnStatusCodeFailure: true
    }).then((response) => {
      // Get the last message and assign to messageData
      const messageData = response.body.msgs.find(
        (email) =>
          email.subject == "Confirmation code" &&
          email.seconds_ago < 20
      )
      // If some validation get true, wait a little and try again (recurse)
      if (response.status !== 200 || !messageData || Date.now() > endTime) {
        cy.wait(interval)
        return getMessage()
      }
      // If everything goes well, call Mailinator message API to
      // retrieve the message content and extract the confirmation code.
      cy.request({
        method: 'GET',
        url: `${getMessageUrl}/${messageData.id}?token=${Cypress.env('MAILINATOR_API_TOKEN')}`,
      }).then((response) => {
        expect(response.status).eq(200)
        cy.wrap(JSON.stringify(response.body.parts).match(/code is (?<code>\w+)/).groups.code) //, { log: false }).its('groups.code', { log: false })
      })
    })
  }
  getMessage()
})