const express = require("express")

const contrat = require("../controllers/contrat.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new contrat
router.post("/", contrat.create)

//retrieve all contrats
router.get("/", contrat.findAll)

//retrieve all published contrats
router.get("/published", contrat.findAllPublished)

//retrieve a single contrat with id
router.get("/:id", contrat.findOne)

//update a contrat with id
router.put("/:id", contrat.update)
router.patch("/:id", contrat.update)

//delete a contrat with id
router.delete("/:id", contrat.delete)

//delete all contrats
router.delete("/", contrat.deleteAll)

module.exports = router
