const router = require("express").Router()
const controller = require("./../controllers/api/api.reviews.controller")

router.get("/", (req, res, next) => { controller.loadReviews(req, res, next) })
router.get("/:reviewID", (req, res, next) => { controller.loadReview(req, res, next) })
router.get("/user/:userID", (req, res, next) => { controller.loadUserReviews(req, res, next) })
router.get("/game/:gameID", (req, res, next) => { controller.loadGameReviews(req, res, next) })
router.get("/platform/:platformID", (req, res, next) => { controller.reviewsByPlatform(req, res, next) })
router.get("/relationated/:gameID/:currentReviewID", (req, res, next) => { controller.loadRelationatedReviews(req, res, next) })

router.post("/add", (req, res, next) => { controller.addReview(req, res, next) })

router.delete("/delete/:reviewID", (req, res, next) => { controller.deleteReview(req, res, next) })

module.exports = router
