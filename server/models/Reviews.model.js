const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewsSchema = new Schema({
  title: String,
  platform: String,
  review: String,
  history: { content: String, rating: Number },
  graphics: { content: String, rating: Number },
  sound: { content: String, rating: Number },
  gameplay: { content: String, rating: Number },
  totalRating: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pros: String,
  cons: String,
  gameID: Number,
}, {
  timestamps: true
})

const ReviewsModel = mongoose.model("Reviews", reviewsSchema)
module.exports = ReviewsModel
