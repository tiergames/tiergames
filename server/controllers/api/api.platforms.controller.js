const axios = require("axios");
const mongoose = require("mongoose")
const Platforms = require("./../../models/Platforms.model")

const controller = {};
const platformsURL = "https://api-v3.igdb.com/platforms";

require("./../../configs/db.config")

controller.platforms = async (req, res, next) => {
  try {
    let platforms = await Platforms
    .find()
    .select({name: 1, platform_logo: 1})
    res.status(200).json(platforms)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
};

module.exports = controller;
