"use strict"
const { generateResetToken } = require("../authentication/auth.js")
const nodemailer = require("nodemailer")

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  async sendWelcomeMail(user) {
    const verifyMailToken = generateVerifyMailToken(user)
    const welcomeLink = `${process.env.BASE_URL}/verify-mail/${verifyMailToken}`
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "welcome on board",
      text: `Hello ${user.username}, you have joined myEvaluation. Click on the following link to verify your password: ${resetLink}`,
    }
    await this.transporter.sendMail(mailOptions)
  }

}

  async forgottenPassword(user) {
    const resetToken = generateResetToken(user)
    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Forgotten password",
      text: `Hello ${user.username}, you have requested a new password. Click on the following link to reset your password: ${resetLink}`,
    }
    await this.transporter.sendMail(mailOptions)
  }
}

module.exports = MailService
