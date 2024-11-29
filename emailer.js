const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTP_HOST,
  port: parseInt(process.env.MAIL_SMTP_PORT),
  secure: parseInt(process.env.MAIL_SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_SENDER_ADDRESS,
    pass: process.env.MAIL_SENDER_PASSWORD,
  }
})

module.exports = transporter