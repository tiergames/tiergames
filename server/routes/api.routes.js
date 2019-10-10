const router = require("express").Router()
const controller = require("../controllers/api/api.controller")

router.use("/games", require("./api.games.routes"))
router.use("/genres", require("./api.genres.routes"))
router.use("/platforms", require("./api.platforms.routes"))
router.use("/best-rated", require("./api.rating.routes"))
router.use("/coming-soon", require("./api.coming.routes"))

module.exports = router
