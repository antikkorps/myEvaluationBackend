//INFO - I extracted this part of the index.js in order to be able to use jest with Supertest
// Reference: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

const express = require("express")
const app = express()

// welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to myEvaluation app API." })
})

module.exports = app
