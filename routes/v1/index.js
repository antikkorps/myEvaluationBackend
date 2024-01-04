const express = require("express")
const router = express.Router()

const entrepriseRoutes = require("../entreprise.routes")
const contratRoutes = require("../contrat.routes")
const evaluationRoutes = require("../evaluation.routes")
const loginRoutes = require("../login.routes")
const methodeRoutes = require("../methode.routes")
const roleRoutes = require("../role.routes")
const tagRoutes = require("../tag.routes")
const userRoutes = require("../user.routes")

router.use("/entreprise", entrepriseRoutes)
router.use("/contrat", contratRoutes)
router.use("/evaluation", evaluationRoutes)
router.use("/login", loginRoutes)
router.use("/methode", methodeRoutes)
router.use("/role", roleRoutes)
router.use("/tag", tagRoutes)
router.use("/user", userRoutes)

module.exports = router
