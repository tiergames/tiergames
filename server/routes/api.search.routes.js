const router = require("express").Router()
const controller = require("./../controllers/api/api.search.controller")

router.get("/games", (req, res, next) => { controller.makeGamesSearch(req, res, next) })
router.get("/reviews", (req, res, next) => { controller.makeReviewsSearch(req, res, next) })
router.get("/users", (req, res, next) => { controller.makeUsersSearch(req, res, next) })

module.exports = router
