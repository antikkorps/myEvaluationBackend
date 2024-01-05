const tags = require("../controllers/tag.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new tag
router.post("/", tags.create)

//retrieve all tags
router.get("/", tags.findAll)

//retrieve a single tag with id
router.get("/:id", tags.findOne)

//update a tag with id
router.put("/:id", tags.update)
router.patch("/:id", tags.update)

//delete a tag with id
router.delete("/:id", tags.delete)

//delete all tags
router.delete("/", tags.deleteAll)

module.exports = router
