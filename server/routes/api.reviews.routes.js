const router = require("express").Router()
const controller = require("./../controllers/api/api.reviews.controller")

router.get("/", (req, res, next) => {
  controller.loadReviews(req, res, next)
})

router.get("/:reviewID", (req, res, next) => {
  controller.loadReview(req, res, next)
})

router.post("/add", (req, res, next) => {
  controller.addReview(req, res, next)
})

module.exports = router
