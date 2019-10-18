const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatMessageSchema = new Schema({
  content: String,
  username: String,
  room: String
}, {
  timestamps: true
})

const ChatMessageModel = mongoose.model("ChatMessages", chatMessageSchema)
module.exports = ChatMessageModel
