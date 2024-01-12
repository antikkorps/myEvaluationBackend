const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// generate a JWT token
const generateToken = (payload) => {
  const {
    password,
    email,
    firstName,
    lastName,
    fonction,
    entreprise,
    entreprise_id,
    evaluations_formateur,
    evaluations_participant,
    phone,
    avatar,
    resetToken,
    resetTokenExpiry,
    createdAt,
    updatedAt,
    ...userWithoutSensitiveInfo
  } = payload
  const token = jwt.sign(userWithoutSensitiveInfo, process.env.JWT_SECRET, {
    expiresIn: "48h",
  })
  return token
}

const generateResetToken = () => {
  const token = jwt.sign({ reset: true }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })
  return token
}

// Verify a JWT Token and grant access to the user
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"]
  if (!bearerHeader) {
    return res.status(403).send({ auth: false, message: "No token provided." })
  }

  const bearer = bearerHeader.split(" ")
  const bearerToken = bearer[1]

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." })
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id
    next()
  })
}

// Verify if the user is ADMIN
function isAdmin(req, res) {
  const bearerHeader = req.headers["authorization"]
  if (!bearerHeader) {
    return res.status(403).send({ auth: false, message: "No token provided." })
  }

  const bearer = bearerHeader.split(" ")
  const bearerToken = bearer[1]

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." })
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id
    if (decoded.role !== "ADMIN") {
      return res
        .status(403)
        .send({ auth: false, message: "Not authorized. You must be Administrator" })
    }
  })
}

// Utility function to decode the JWT token and get the username
function getEmailFromToken(req, res, next) {
  const bearerHeader = req.headers["authorization"]
  if (!bearerHeader) {
    return res.status(403).send({ auth: false, message: "No token provided." })
  }

  const bearer = bearerHeader.split(" ")
  const bearerToken = bearer[1]

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." })
    }
    req.userId = decoded.id
    req.email = decoded.email
    console.log(req.userId, req.email)
    next()
  })
}

module.exports = {
  generateToken,
  generateResetToken,
  verifyToken,
  isAdmin,
  getEmailFromToken,
}
