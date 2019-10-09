const controller = {};

const ratingURL = "https://api-v3.igdb.com/games";
const axios = require("axios");

controller.bestRated = (req, res, next) => {
  axios({
    url: ratingURL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.IGDB_API_KEY
    },
    data: `fields name, rating;
    where rating != null;
    sort rating desc;`
  })
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

module.exports = controller;
