const express = require("express")

const evaluation = require("../controllers/evaluation.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new evaluation
router.post("/", evaluation.create)

//retrieve all evaluations
router.get("/", evaluation.findAll)

//retrieve all published evaluations
router.get("/published", evaluation.findAllPublished)

//retrieve a single evaluation with id
router.get("/:id", evaluation.findOne)

//update a evaluation with id
router.put("/:id", evaluation.update)
router.patch("/:id", evaluation.update)

//delete a evaluation with id
router.delete("/:id", evaluation.delete)

//delete all evaluations
router.delete("/", evaluation.deleteAll)

module.exports = router
