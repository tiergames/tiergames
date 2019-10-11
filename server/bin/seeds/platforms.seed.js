const mongoose = require("mongoose")
const Platforms = require("./../../models/Platforms.model")
const platformsData = require("./data/platforms.data.json")

const platformsSeed = async () => {
  try {
    let platforms = await Platforms.create(platformsData)
    console.log("Platforms: ", platforms)
    console.log("Platforms seed executed")
    return platforms
  } catch (error) {
    console.log("Error: ", error.message)
  }
}

module.exports = platformsSeed
