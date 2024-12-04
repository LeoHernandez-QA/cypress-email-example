/// <reference types="cypress" />
const ms = require('smtp-tester')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // starts the SMTP server
  const port = parseInt(process.env.MAIL_SMTP_PORT)
  const mailServer = ms.init(port)
  console.log('mail server at port %d', port)
}