const router = require("express").Router()
const controller = require("../controllers/api/api.controller")

router.use("/games", require("./api.games.routes"))
router.use("/reviews", require("./api.reviews.routes"))
router.use("/genres", require("./api.genres.routes"))
router.use("/platforms", require("./api.platforms.routes"))
router.use("/search", require("./api.search.routes"))

module.exports = router