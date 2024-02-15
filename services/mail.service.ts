"use strict"
const { generateResetToken } = require("../authentication/auth.js")

import nodemailer, { Transporter } from "nodemailer"

class MailService {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  async forgottenPassword(user) {
    const reseToken = generateResetToken(user)
    const resetLink = `${process.env.BASE_URL}/reset-password/${reseToken}`
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
