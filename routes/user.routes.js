const users = require("../controllers/user.controller.js")
const router = require("express").Router()

//create a new role
router.post("/", users.create)

//retrieve all roles
router.get("/", users.findAll)

//retrieve a single role with id
router.get("/:id", users.findOne)

//update a role with id
router.put("/:id", users.update)
router.patch("/:id", users.update)

//delete a role with id
router.delete("/:id", users.delete)

//delete all roles
router.delete("/", users.deleteAll)

module.exports = router
