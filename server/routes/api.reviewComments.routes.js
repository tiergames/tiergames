const router = require("express").Router()
const controller = require("./../controllers/api/api.reviewComments.controller")

router.get("/", (req, res, next) => { controller.loadAll(req, res, next) })
router.post("/add", (req, res, next) => { console.log("AAAADING");controller.addComment(req, res, next) })

module.exports = router