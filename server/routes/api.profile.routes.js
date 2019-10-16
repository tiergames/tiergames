const router = require("express").Router()
const controller = require("./../controllers/api/api.profile.controller")

router.get("/:username", (req, res, next) => { controller.getProfile(req, res, next) })
router.put("/follow", (req, res, next) => { controller.follow(req, res, next) })

module.exports = router
