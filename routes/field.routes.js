const express = require("express")

const field = require("../controllers/field.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new field
router.post("/", field.create)

//retrieve all fields
router.get("/all", field.findAll)

//retrieve a single field with id
router.get("/:id", field.findOne)

//update a field with id
router.put("/:id", field.update)
router.patch("/:id", field.update)

//delete a field with id
router.delete("/:id", field.delete)

//delete all fields
router.delete("/", field.deleteAll)


module.exports = router