const axios = require("axios");

const controller = {};
const platformsURL = "https://api-v3.igdb.com/platforms";

controller.platforms = (req, res, next) => {
  axios({
    url: platformsURL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.IGDB_API_KEY
    },
    data: "fields name, platform_logo; limit 50;"
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
