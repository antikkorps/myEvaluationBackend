require("dotenv").config()
const app = require("./app")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client")
const { verifyToken } = require("./authentication/auth")
const loginRoute = require("./routes/auth.routes")
const prisma = new PrismaClient()
// I commented this out to dissociate the server from the app in order to use jest testing
// const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
}

app.use(cors())
app.use(cookieParser())

//parse requests of content-type - application/json
app.use(express.json())

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Route to connect the user and get the JWT Token

const v1Routes = require("./routes/v1")

app.use("/api/v1", v1Routes)

//set port, listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
