const router = require("express").Router();
const controller = require("../controllers/api/api.coming.controller");

router.get("/", (req, res, next) => {
  controller.coming(req, res, next);
});

module.exports = router;