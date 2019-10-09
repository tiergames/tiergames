const router = require("express").Router()
const controller = require("../controllers/api/api.controller")

router.use("/games", require("./api.games.routes"))
router.use("/genres", require("./api.genres.routes"))
router.use("/platforms", require("./api.platforms.routes"))

module.exports = router
