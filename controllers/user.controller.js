const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const UserController = {
  // Create a new user
  async create(req, res) {
    const {
      name,
      firstName,
      username,
      email,
      phone,
      password,
      role_id,
      fonction,
      avatar,
    } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await prisma.user.create({
        data: {
          name,
          firstName,
          username,
          email,
          phone,
          password: hashedPassword,
          role_id,
          fonction,
          avatar,
        },
      })
      res.status(201).json(newUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while creating the user.",
      })
    }
  },

  // Find all users
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 20
      const offset = (page - 1) * limit

      const users = await prisma.user.findMany({
        take: limit,
        skip: offset,
      })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while retrieving all the users. Please try again later.",
      })
    }
  },

  // Find a user by ID
  async findOne(req, res) {
    const { id } = req.params
    console.log(id)
    try {
      const user = await prisma.user.findUnique({
        where: { id: String(id) },
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
          phone: true,
          role: true,
          fonction: true,
          avatar: true,
          entreprise: true,
          evaluations_formateur: true,
          evaluations_participant: true,
          evaluation_commentaires: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." })
      }
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while retrieving the user. Please try again later.",
      })
    }
  },

  // Get the current user using the jwt token
  async findCurrentUser(req, res) {
    console.log("début de myprofile")
    const token = req.cookies.token || req.headers.authorization.split(" ")[1]
    console.log(token)
    if (!token) {
      return res.status(403).send({ message: "No token provided." })
    }
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedToken)
      const user = await prisma.user.findUnique({
        where: { id: String(decodedToken.id) },
      })
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." })
      }
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while retrieving the user. Please try again later.",
      })
    }
  },

  // Update a user by ID
  async update(req, res) {
    const { id } = req.params
    const { name, firstName, username, email, phone, password, role, fonction, avatar } =
      req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          firstName,
          username,
          email,
          phone,
          password: hashedPassword,
          role,
          fonction,
          avatar,
        },
      })
      res.status(200).json(updatedUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while updating the user. Please try again later.",
      })
    }
  },

  // Delete a user by ID
  async delete(req, res) {
    const { id } = req.params
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      })
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while deleting the user. Please try again later.",
      })
    }
  },

  // Delete All users
  async deleteAll(req, res) {
    try {
      await prisma.user.deleteMany()
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "An error occured while deleting all the users. Please try again later.",
      })
    }
  },
}

module.exports = UserController
