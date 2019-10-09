const router = require("express").Router();
const controller = require("../controllers/api/api.rating.controller");

router.get("/", (req, res, next) => {
  controller.bestRated(req, res, next);
});

module.exports = router;
