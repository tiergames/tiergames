const controller = {}

const genresURL = "https://api-v3.igdb.com/genres/";
const axios = require("axios")

controller.genres = (req, res, next) => {
  axios({
    url: genresURL,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': process.env.IGDB_API_KEY
    },
    data: `fields name; limit 50;`
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
