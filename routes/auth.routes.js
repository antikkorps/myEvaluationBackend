const { generateToken } = require("../authentication/auth.js")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const auth = require("../controllers/auth.controller.js")
const router = require("express").Router()

// Signup route to create a new user
router.post("/signup", auth.signup)

// Login route to get the JWT Token
router.post("/login", auth.signin)

// Forgot password route
router.post("/forgot", auth.forgottenPass)

module.exports = router
