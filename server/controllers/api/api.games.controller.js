require("dotenv").config()
const axios = require("axios")

const controller = {}
const gamesURL = 'https://api-v3.igdb.com/games'

controller.games = (req, res, next) => {
  let genresFilter = req.query.genres ? `where genres = [${req.query.genres}];` : null
  axios({
    url: gamesURL,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': process.env.IGDB_API_KEY
    },
    data: `
      fields name, cover, genres;
      limit ${req.query.limit};
      offset ${req.query.offset}; ${genresFilter ? genresFilter : ''}`
  })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      })
    });
}

module.exports = controller
