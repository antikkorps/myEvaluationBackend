const { generateToken } = require("../authentication/auth")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const users = require("../controllers/user.controller.js")
const router = require("express").Router()

// Login route to get the JWT Token
router.post("/", users.login)

module.exports = router
