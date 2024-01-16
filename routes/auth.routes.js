const { generateToken } = require("../authentication/auth.js")
const { validateEmail, validatePassword } = require("../authentication/validateEmail.js")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const auth = require("../controllers/auth.controller.js")
const router = require("express").Router()

// Signup route to create a new user
router.post("/signup", validateEmail, validatePassword, auth.signup)

// Login route to get the JWT Token
router.post("/login", validateEmail, auth.signin)

// Forgot password route
router.post("/forgotten-password", auth.forgottenPassword)

// Reset password route
router.post("/reset-password", auth.resetPassword)

module.exports = router
