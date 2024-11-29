const transporter = require('./emailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send an email
  console.log(transporter)
  const info = await transporter.sendMail({
    from: process.env.MAIL_SENDER_ADDRESS,
    to: 'receiverqa@team362214.testinator.com',
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
}

main().catch(console.error)
