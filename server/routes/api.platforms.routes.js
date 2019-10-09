const router = require("express").Router()
const controller = require("../controllers/api/api.platforms.controller")

router.get("/", (req, res, next) => {
  controller.platforms(req, res, next)
})

module.exports = router