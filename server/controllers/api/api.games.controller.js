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

controller.gameInfo = async (req, res, next) => {
  try {
    let gameInfo = await axios({
      url: gamesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields alternative_names, category, collection,
          cover, dlcs, first_release_date, name, game_modes,
          genres, hypes, involved_companies, parent_game,
          platforms, release_dates, status, storyline, summary,
          url, version_title, videos, websites, total_rating, total_rating_count;
        where id = ${req.params.gameID};
      `
    })
  
    res.status(200).json(gameInfo.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

module.exports = controller
