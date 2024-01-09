const express = require("express")
const router = express.Router()

const companyRoutes = require("../company.routes")
const contratRoutes = require("../contrat.routes")
const evaluationRoutes = require("../evaluation.routes")
const commentaireRoutes = require("../evaluationCommentaire.routes")
const authRoutes = require("../auth.routes")
const methodeRoutes = require("../methode.routes")
const roleRoutes = require("../role.routes")
const tagRoutes = require("../tag.routes")
const userRoutes = require("../user.routes")

router.use("/entreprise", companyRoutes)
router.use("/contrat", contratRoutes)
router.use("/evaluation", evaluationRoutes)
router.use("/commentaire", commentaireRoutes)
router.use("/auth", authRoutes)
router.use("/methode", methodeRoutes)
router.use("/role", roleRoutes)
router.use("/tag", tagRoutes)
router.use("/user", userRoutes)

module.exports = router
