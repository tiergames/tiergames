const router = require("express").Router()
const controller = require("./../controllers/api/api.genres.controller")

router.get("/", (req, res, next) => {
  controller.genres(req, res, next)
})

module.exports = router
