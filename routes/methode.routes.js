const methodes = require("../controllers/methode.controller.js")
const router = require("express").Router()

//create a new methode
router.post("/", methodes.create)

//retrieve all methodes
router.get("/", methodes.findAll)

//retrieve a single methode with id
router.get("/:id", methodes.findOne)

//update a methode with id
router.put("/:id", methodes.update)
router.patch("/:id", methodes.update)

//delete a methode with id
router.delete("/:id", methodes.delete)

//delete all methodes
router.delete("/", methodes.deleteAll)

module.exports = router
