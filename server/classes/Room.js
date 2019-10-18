const ChatMessage = require("./../models/ChatMessage.model")

class Room {
  constructor() {
    this.messsages = []
  }

  async saveMessage(content, username, room) {
    try {
      let newMessage = await ChatMessage.create({ content, username, room })
      return newMessage
    } catch (error) {
      return {
        err: error.message
      }
    }
  }

  async getMessagesPerRoom(roomID) {
    try {
      let messagesPerRoom = await ChatMessage.find({ room: roomID })
      return messagesPerRoom
    } catch (error) {
      return {
        err: error.message
      }
    }
  }
}

module.exports = { Room }
