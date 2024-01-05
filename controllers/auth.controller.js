const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { generateToken, generateResetToken } = require("../authentication/auth.js")

// Signup function
const signup = (req, res) => {
  const { email, password } = req.body
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
      res.cookie("token", token, { httpOnly: true })
      res.status(200).json({ token })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la connexion de l'utilisateur.",
      })
    })
}

// Forgotten password function
const forgottenPassword = (req, res) => {
  const { email } = req.body
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
      const resetToken = generateResetToken()
      return prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
      })
    })
    .then(() => {
      //TODO Envoyer un email à l'utilisateur avec le lien de réinitialisation
      res.status(200).json({ message: "Email envoyé." })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la réinitialisation du mot de passe.",
      })
    })
}

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
