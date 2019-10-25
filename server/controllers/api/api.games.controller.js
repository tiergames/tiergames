require("dotenv").config()
const axios = require("axios")
const User = require("./../../models/User")

const controller = {}
const gamesURL = 'https://api-v3.igdb.com/games'
const coversURL = 'https://api-v3.igdb.com/covers'
const alternativeNamesURL = 'https://api-v3.igdb.com/alternative_names'
const collectionsURL = "https://api-v3.igdb.com/collections"
const companiesURL = "https://api-v3.igdb.com/companies"
const releasesURL = "https://api-v3.igdb.com/release_dates"
const websitesURL = "https://api-v3.igdb.com/websites"
const videosURL = "https://api-v3.igdb.com/game_videos"

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
        fields name, cover.url, genres, popularity, first_release_date, rating, platforms.name, screenshots.url;
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
        fields alternative_names.name, category, collection.games.name, slug,
          cover.url, dlcs, first_release_date, name, game_modes.name, screenshots.url,
          genres.name, hypes, involved_companies.company.name, parent_game,
          platforms.name, release_dates.date, status, storyline, summary, rating,
          url, version_title, videos.*, websites.*, total_rating, total_rating_count, similar_games.cover.url, similar_games.name;
        where id = ${req.params.gameID};
      `
    })
  
    res.status(200).json(gameInfo.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.getGameName = async (req, res, next) => {
  try {
    let gameName = await axios({
      url: gamesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name;
        where id = ${req.params.gameID};
      `
    })
    
    res.status(200).json(gameName.data[0])
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.getGameCover = async (req, res, next) => {
  try {
    let gameCoverUrl = await axios({
      url: coversURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields url;
        where game = ${req.params.gameID};
      `
    })

    res.status(200).json(gameCoverUrl.data[0].url)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.getRelatedGames = async (req, res, next) => {
  try {
    let relatedGamesWhere = req.params.relatedGames.replace("[", "(").replace("]", ")")
    let relatedGames = await axios({
      url: gamesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name;
        where id = ${relatedGamesWhere};
      `
    })
  
    res.status(200).json(relatedGames.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.getAlternativeNames = async (req, res, next) => {
  try {
    let alternativeNames = await axios({
      url: alternativeNamesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name, comment;
        where game = ${req.params.gameID};
      `
    })
  
    res.status(200).json(alternativeNames.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.getRelationedContent = async (req, res, next) => { // Collection
  try {
    // First get the collection data
    let collection = await axios({
      url: collectionsURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields games;
        where id = ${req.params.collectionID};
      `
    })

    // If the games.length are greater than 10, we keep just the 10 first
    let gameRelationedContent = collection.data[0].games.length > 10 ? collection.data[0].games.splice(0, 10) : collection.data[0].games
    
    try {
      // Second get the games data with their IDs
      let relatedContent = await axios({
        url: gamesURL,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.IGDB_API_KEY
        },
        data: `
          fields name;
          where id = ${JSON.stringify(gameRelationedContent).replace("[", "(").replace("]", ")")};
        `
      })
    
      res.status(200).json(relatedContent.data)
    } catch (err) {
      res.status(500).json({err: err.message})
    }
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.getInvolvedCompanies = async (req, res, next) => {
  let companiesArray = req.params.companies.replace("[", "(").replace("]", ")").replace("%20", "")
  try {
    let involvedCompanies = await axios({
      url: companiesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name;
        where id = ${companiesArray};
      `
    })
  
    res.status(200).json(involvedCompanies.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.getReleaseDates = async (req, res, next) => {
  try {
    let releaseDateArray = req.params.releaseID.replace("[", "(").replace("]", ")")
    let releaseDates = await axios({
      url: releasesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields date;
        where id = ${releaseDateArray};
      `
    })
  
    res.status(200).json(releaseDates.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.getWebsites = async (req, res, next) => {
  try {
    let websitesArray = req.params.websitesID.replace("[", "(").replace("]", ")").replace("%20", "")
    let websites = await axios({
      url: websitesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields url;
        where id = ${websitesArray};
      `
    })
  
    res.status(200).json(websites.data)
  } catch (err) {s
    res.status(500).json({err: err.message})
  }
}

controller.getVideos = async (req, res, next) => {
  try {
    let videosIDs = req.params.videosID.replace("[", "(").replace("]", ")").replace("%20", "")

    // TODO: Implementar caché contra base de datos 
    // ~ Consultar videos contra base de datos mongo
    // ~ Comprobar fecha de validez de videos. 
    //  - Si ha caducado(ej: 24 horas han pasado) o no existe
    //    * hacer llamada a IGDB
    //    * guardar resultados con fecha en base de datos
    //  - Si NO ha caducado
    //    * Devolver resultados de base de datos

    let videos = await axios({
      url: videosURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name, video_id;
        where game = ${videosIDs};
      `
    })
  
    res.status(200).json(videos.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.follow = async (req, res, next) => {
  try {
    let { gameID, followerID } = req.body
    let followerRequest = await User.findByIdAndUpdate(followerID, { $push: { savedGames: gameID } }, { new: true })
    res.status(200).json({ gameFollowRequestDone: true, follower: followerRequest })
  } catch (error) {
    res.status(500).json({ gameFollowRequestDone: false, err: error.message })
  }
}

controller.unfollow = async (req, res, next) => {
  try {
    let { gameID, followerID } = req.body
    let unfollowRequest = await User.findByIdAndUpdate(followerID, { $pull: { savedGames: gameID } }, { new: true })

    res.status(200).json({ gameUnfollowRequestDone: true, follower: unfollowRequest })
  } catch (error) {
    res.status(500).json({ gameUnfollowRequestDone: true, follower: unfollowRequest })
  }
}

module.exports = controller
