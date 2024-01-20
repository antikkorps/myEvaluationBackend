const express = require("express")

const forms = require("../controllers/form.controller.js")
const router = require("express").Router()

const { verifyToken, isAdmin, getEmailFromToken } = require("../authentication/auth.js")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken, getEmailFromToken)

//create a new form
router.post("/", isAdmin, forms.create)
router.post("/:id/fields", isAdmin, forms.createField)

//retrieve all forms
router.get("/all", forms.findAll)

//retrieve a single form with id
router.get("/:id", forms.findOne)

//update an form with id
router.put("/:id", forms.update)
router.patch("/:id", forms.update)

//delete an form with id
router.delete("/:id", forms.delete)

//delete all forms
router.delete("/", forms.deleteAll)

module.exports = router
