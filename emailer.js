const nodemailer = require('nodemailer')

/*const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTP_HOST,
  port: parseInt(process.env.MAIL_SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_SENDER_ADDRESS,
    pass: process.env.MAIL_SENDER_PASSWORD,
  }
});*/

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 7777,
  secure: false, // true for 465, false for other ports
})

module.exports = transporter
