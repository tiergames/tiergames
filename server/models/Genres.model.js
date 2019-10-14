const mongoose = require("mongoose")
const Schema = mongoose.Schema

const genresSchema = new Schema({
    id: Number,
    created_at: Number,
    name: String,
    slug: String,
    updated_at: Number,
    url: String
})

const GenresModel = mongoose.model("Genres", genresSchema)
module.exports = GenresModel

