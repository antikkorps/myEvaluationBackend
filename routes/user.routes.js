const users = require("../controllers/user.controller.js")
const router = require("express").Router()

const { verifyToken, isAdmin } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new user
router.post("/", isAdmin, users.create)

//retrieve all users
router.get("/all", users.findAll)

//Get the current user
router.get("/myprofile", users.findCurrentUser)

//retrieve a single user with id
router.get("/:id", users.findOne)

//update a user with id
router.put("/:id", users.update)
router.patch("/:id", users.update)

//delete a user with id
router.delete("/:id", users.delete)

//delete all users
router.delete("/", isAdmin, users.deleteAll)

module.exports = router
