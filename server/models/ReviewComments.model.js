const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewCommentsSchema = new Schema({
  content: String,
  reviewID: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' },
  likes: {type: Number, default: 0},
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
})

const ReviewComments = mongoose.model("ReviewComments", reviewCommentsSchema)
module.exports = ReviewComments
