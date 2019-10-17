class OnlineUsers {
  constructor() {
    this.onlineUsers = []
  }

  addUser(id, username, room) {
    this.onlineUsers.push({ id, username, room })
    return this.onlineUsers
  }

  getUserInfo(id) {
    return this.onlineUsers.find(user => user.id === id)
  }

  getUsersPerRoom(room) {
    return this.onlineUsers.filter(user => user.room === room)
  }

  getUsers() {
    return this.onlineUsers
  }

  removeUser(id) {
    let removedUser = this.getUserInfo(id)
    this.onlineUsers = this.onlineUsers.filter(user => user.id !== removedUser.id)
    return removedUser
  }
}

module.exports = { OnlineUsers }
