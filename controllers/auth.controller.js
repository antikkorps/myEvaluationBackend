const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { generateToken, generateResetToken } = require("../authentication/auth.js")
const mailService = require("../services/mail.service")

// Signup function
const signup = (req, res) => {
  const { email, password } = req.body

  const user = prisma.user.findUnique({ email })

  if (user) {
    return res
      .status(409)
      .json({ error: "l'utilisateur ou le mot de passe existe déjà." })
  }

  const saltRounds = 10
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hash,
        },
      })
      const token = generateToken(user)
      res.cookie("token", token, { httpOnly: true })
      res.status(201).json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la création de l'utilisateur.",
      })
    }
  })
}

// Signin function
const signin = (req, res) => {
  const { email, password } = req.body
  prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." })
      }
      const compared = bcrypt.compareSync(password, user.password)
      if (!compared) {
        return res.status(401).json({ error: "Mot de passe ou utilisateur incorrect." })
      }
      const token = generateToken(user)
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ auth: true, token })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la connexion de l'utilisateur.",
      })
    })
}

// Forgotten password function
const forgottenPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." })
    }

    await mailService.sendMail(user) // Envoyer l'e-mail

    return res.status(200).json({ message: "Email envoyé." })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'envoi de l'e-mail.",
    })
  }
}

// Reset password function
const resetPassword = (req, res) => {
  const { resetToken, password } = req.body
  prisma.user
    .findUnique({
      where: {
        resetToken,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." })
      }
      if (user.resetTokenExpiry < Date.now()) {
        return res.status(401).json({ error: "Le token de réinitialisation a expiré." })
      }
      const saltRounds = 10
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        try {
          const user = await prisma.user.update({
            where: { resetToken },
            data: {
              password: hash,
              resetToken: null,
              resetTokenExpiry: null,
            },
          })
          const token = generateToken(user)
          res.cookie("token", token, { httpOnly: true })
          res.status(200).json({ token })
        } catch (error) {
          console.error(error)
          res.status(500).json({
            error: "Une erreur est survenue lors de la réinitialisation du mot de passe.",
          })
        }
      })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la réinitialisation du mot de passe.",
      })
    })
}

module.exports = {
  signup,
  signin,
  forgottenPassword,
  resetPassword,
}
