require("dotenv").config()
const axios = require("axios")

const controller = {}
const gamesURL = 'https://api-v3.igdb.com/games'

controller.games = async (req, res, next) => {
  let totalFilter = []
  let sorting = req.query.sorting ? req.query.sorting : null

  req.query.genres ? totalFilter.push(`genres=[${req.query.genres}]`) : null
  req.query.platforms ? totalFilter.push(`platforms=[${req.query.platforms}]`) : null
  
  if (sorting !== null && sorting === "first_release_date") {
    totalFilter.push(`first_release_date >= ${req.query.from} & first_release_date <= ${req.query.to}`)
  }

  if (sorting !== null && sorting === "rating") {
    totalFilter.push(`rating != null`)
  }

  try {
    let games = await axios({
      url: gamesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name, cover, genres, popularity, first_release_date, rating;
        limit ${req.query.limit};
        offset ${req.query.offset};
        ${totalFilter.length > 0 ? `where ${totalFilter.join(" & ")};` : ''}
        ${sorting !== null ? `sort ${sorting} ${req.query.order};` : ''}
        `
    })

    res.status(200).json(games.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
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
          platforms, release_dates, status, storyline, summary, rating,
          url, version_title, videos, websites, total_rating, total_rating_count, similar_games;
        where id = ${req.params.gameID};
      `
    })
  
    res.status(200).json(gameInfo.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

module.exports = controller