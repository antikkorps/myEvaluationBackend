const express = require("express")

const entreprises = require("../controllers/entreprise.controller.js")
const router = require("express").Router()

const { verifyToken, isAdmin, getEmailFromToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken, getEmailFromToken)

//create a new entreprise
router.post("/", isAdmin, entreprises.create)

//retrieve all entreprises
router.get("/all", entreprises.findAll)

//retrieve a single entreprise with id
router.get("/:id", entreprises.findOne)

//update an entreprise with id
router.put("/:id", entreprises.update)
router.patch("/:id", entreprises.update)

//delete an entreprise with id
router.delete("/:id", entreprises.delete)

//delete all entreprises
router.delete("/", entreprises.deleteAll)

module.exports = router
