const router = require("express").Router();
const controller = require("./../controllers/api/api.games.controller");

router.get("/", (req, res, next) => { controller.games(req, res, next); });
router.get("/:gameID", (req, res, next) => { controller.gameInfo(req, res, next) })
router.get("/game-name/:gameID", (req, res, next) => { controller.getGameName(req, res, next) })
router.get("/game-cover/:gameID", (req, res, next) => { controller.getGameCover(req, res, next) })
router.get("/related/:relatedGames", (req, res, next) => { controller.getRelatedGames(req, res, next) })
router.get("/alternative-names/:gameID", (req, res, next) => { controller.getAlternativeNames(req, res, next) })
router.get("/related-content/:collectionID", (req, res, next) => { controller.getRelationedContent(req, res, next) })
router.get("/involved-companies/:companies", (req, res, next) => { controller.getInvolvedCompanies(req, res, next) })
router.get("/release-dates/:releaseID", (req, res, next) => { controller.getReleaseDates(req, res, next) })
router.get("/websites/:websitesID", (req, res, next) => { controller.getWebsites(req, res, next) })

router.put("/follow", (req, res, next) => { controller.follow(req, res, next) })
router.put("/unfollow", (req, res, next) => { controller.unfollow(req, res, next) })

module.exports = router
