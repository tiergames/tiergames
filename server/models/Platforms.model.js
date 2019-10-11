const mongoose = require("mongoose")
const Schema = mongoose.Schema

const platformsSchema = new Schema({
    id: Number,
    abbreviation: String,
    alternative_name: String,
    category: Number,
    created_at: Number,
    generation: Number,
    name: String,
    platform_logo: Number,
    product_family: Number,
    summary: String,
    slug: String,
    updated_at: Number,
    url: String,
    versions: [Number],
    websites: [Number]
})

const PlatformsModel = mongoose.model("Platforms", platformsSchema)
module.exports = PlatformsModel

