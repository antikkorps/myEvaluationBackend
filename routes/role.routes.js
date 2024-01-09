const roles = require("../controllers/role.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new role
router.post("/", roles.create)

//retrieve all roles
router.get("/all", roles.findAll)

//retrieve a single role with id
router.get("/:id", roles.findOne)

//update a role with id
router.put("/:id", roles.update)
router.patch("/:id", roles.update)

//delete a role with id
router.delete("/:id", roles.delete)

//delete all roles
router.delete("/", roles.deleteAll)

module.exports = router
