const router = require("express").Router()
const controller = require("./../controllers/api/api.reviews.controller")

router.post("/add", (req, res, next) => {
  // res.status(200).json({response: 'conected', body: req.body})
  controller.addReview(req, res, next)
})

module.exports = router
