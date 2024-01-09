const commentaires = require("../controllers/evaluationCommentaire.controller.js")
const router = require("express").Router()

const { verifyToken } = require("../authentication/auth")

//verifyToken is a middleware to check the validity of the token
router.use(verifyToken)

//create a new comments
router.post("/", commentaires.create)

//retrieve all comments
router.get("/all", commentaires.findAll)

//retrieve a singlecomment with id
router.get("/:id", commentaires.findOne)

//update a comment with id
router.put("/:id", commentaires.update)
router.patch("/:id", commentaires.update)

//delete a comment with id
router.delete("/:id", commentaires.delete)

//delete all commentaires
router.delete("/", commentaires.deleteAll)

module.exports = router
