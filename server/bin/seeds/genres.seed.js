const mongoose = require("mongoose")
const Genres = require("./../../models/Genres.model")
const genresData = require("./data/Genres.data.json")

const genresSeed = async () => {
  try {
    await Genres.deleteMany()
    console.log("All genres deleted...")
    let genres = await Genres.create(genresData)
    console.log("Genres seed executed")
    return genres
  } catch (error) {
    console.log("Error: ", error.message)
  }
}

module.exports = genresSeed
