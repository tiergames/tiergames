const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewsSchema = new Schema({
  title: String,
  platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Platforms' },
  review: String,
  likes: {type: Number, default: 0},
  history: { content: String, rating: Number },
  graphics: { content: String, rating: Number },
  sound: { content: String, rating: Number },
  gameplay: { content: String, rating: Number },
  totalRating: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pros: String,
  cons: String,
  gameID: Number,
  followers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'ReviewComments' } ]
}, {
  timestamps: true
})

const ReviewsModel = mongoose.model("Reviews", reviewsSchema)
module.exports = ReviewsModel
