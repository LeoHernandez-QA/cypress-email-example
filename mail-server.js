const ms = require('smtp-tester')
const port = process.env.MAIL_SMTP_PORT
const mailServer = ms.init(port)
console.log('mail server at port %d', port)

// process all emails
mailServer.bind((addr, id, email) => {
  console.log('--- email ---')
  console.log(addr, id, email)
})