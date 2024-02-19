const { generateToken } = require("../authentication/auth.js")
const { validateEmail, validatePassword } = require("../authentication/validateEmail.js")
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const auth = require("../controllers/auth.controller.js")
const router = require("express").Router()

// Signup route to create a new user
router.post("/signup", validateEmail, validatePassword, auth.signup)

//send the email with the link passing the token in parameters
router.post("/get-welcome-mail", auth.getWelcomeEmail)

// Verify route to check if user has access to the email address he provided
router.post("/verify-email", auth.verifyEmail)

// Login route to get the JWT Token
router.post("/login", validateEmail, auth.signin)

// Forgot password route
router.post("/forgotten-password", validateEmail, auth.forgottenPassword)

// Reset password route
router.post("/reset-password", validatePassword, auth.resetPassword)

module.exports = router
