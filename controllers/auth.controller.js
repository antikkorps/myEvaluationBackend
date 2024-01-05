const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { generateToken } = require("../authentication/auth.js")

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
const forgottenPass = (req, res) => {
  // TODO: Implement forgotten password logic
}

module.exports = {
  signup,
  signin,
  forgottenPass,
}
