const router = require("express").Router();
const controller = require("./../controllers/api/api.games.controller");

router.get("/", (req, res, next) => {
  controller.games(req, res, next);
});

router.get("/:gameID", (req, res, next) => {
  controller.gameInfo(req, res, next)
})

router.get("/game-name/:gameID", (req, res, next) => {
  controller.getGameName(req, res, next)
})

router.get("/game-cover/:gameID", (req, res, next) => {
  controller.getGameCover(req, res, next)
})

module.exports = router
