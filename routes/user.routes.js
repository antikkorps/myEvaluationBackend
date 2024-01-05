const users = require("../controllers/user.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new user
router.post("/", users.create)

//retrieve all users
router.get("/", users.findAll)

//retrieve a single user with id
router.get("/:id", users.findOne)

//update a user with id
router.put("/:id", users.update)
router.patch("/:id", users.update)

//delete a user with id
router.delete("/:id", users.delete)

//delete all users
router.delete("/", users.deleteAll)

module.exports = router
