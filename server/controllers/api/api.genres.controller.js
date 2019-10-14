const controller = {}
const Genres = require("./../../models/Genres.model")
const genresURL = "https://api-v3.igdb.com/genres/";
const axios = require("axios")

require("./../../configs/db.config")

controller.genres = async (req, res, next) => {
  try {
    let genres = await Genres
      .find()
      .select({name: 1, id: 1})
      
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

module.exports = controller
