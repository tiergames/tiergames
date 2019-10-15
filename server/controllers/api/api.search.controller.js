const Reviews = require("./../../models/Reviews.model")
const User = require("./../../models/User")
const controller = {}
const axios = require("axios")

const gamesURL = "https://api-v3.igdb.com/games"

controller.makeGamesSearch = async (req, res, next) => {
  try {
    let searchResults = await axios({
      url: gamesURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
      },
      data: `
        fields name, id;
        limit 15;
        search "${req.query.s.replace('%20', ' ')}";
      `
    })

    res.status(200).json(searchResults.data)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.makeReviewsSearch = async (req, res, next) => {
  let search = req.query.s.replace('%20', ' ')
  try {
    let searchReviewsResults = await Reviews.find( {title: { $regex: new RegExp('^' + search, "i")}} )
    res.status(200).json(searchReviewsResults)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.makeUsersSearch = async (req, res, next) => {
  let search = req.query.s.replace('%20', ' ')
  try {
    let searchUsersResult = await User.find( { username: { $regex: new RegExp('^' + search, 'i') } } )
    res.status(200).json(searchUsersResult)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

module.exports = controller
