require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client")
const { verifyToken } = require("./authentication/auth")
const loginRoute = require("./routes/login.routes")
const prisma = new PrismaClient()
const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
}

app.use(cors())
app.use(cookieParser())

//parse requests of content-type - application/json
app.use(express.json())

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." })
})

// Utility function to decode the JWT token and get the username
function getUsernameFromToken(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decodedToken.username
}

// Middleware to verify the JWT Token and add the user information to the request object
function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const username = getUsernameFromToken(token)
    req.auth = {
      userId: username,
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}

// Use Example for the authMiddleware
app.get("/api/protected", authMiddleware, (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const username = getUsernameFromToken(token)

    res.json({
      message: "Route protected, user is authenticated",
      user: username,
    })
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
})

// Route to connect the user and get the JWT Token

const v1Routes = require("./routes/v1")

app.use("/api/v1", v1Routes)

// require('./routes/login.routes')(app);
// require('./routes/client.routes')(app);
// require('./routes/contrat.routes')(app);
// require('./routes/evaluation.routes')(app);
// require('./routes/methode.routes')(app);
// require('./routes/role.routes')(app);
// require('./routes/tag.routes')(app);
// require('./routes/user.routes')(app);
// require("./routes/evaluation.routes")(app)

//set port, listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
