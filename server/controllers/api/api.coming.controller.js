require("dotenv").config();
const axios = require("axios");

const controller = {};
const comingURL = "https://api-v3.igdb.com/games";

controller.coming = async (req, res, next) => {
  try {
    const response = await axios({
      url: comingURL,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": process.env.IGDB_API_KEY
      },
      data: `
      fields name, first_release_date, cover, hypes, platforms; 
      where first_release_date != null;
      limit 10;
      sort first_release_date desc;
      `
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = controller;
