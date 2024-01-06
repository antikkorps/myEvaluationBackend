const express = require("express")

const companies = require("../controllers/company.controller.js")
const router = require("express").Router()

const { verifyToken, isAdmin, getEmailFromToken } = require("../authentication/auth.js")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken, getEmailFromToken)

//create a new company
router.post("/", isAdmin, companies.create)

//retrieve all companies
router.get("/all", companies.findAll)

//retrieve a single company with id
router.get("/:id", companies.findOne)

//update an company with id
router.put("/:id", companies.update)
router.patch("/:id", companies.update)

//delete an company with id
router.delete("/:id", companies.delete)

//delete all companys
router.delete("/", companies.deleteAll)

module.exports = router
