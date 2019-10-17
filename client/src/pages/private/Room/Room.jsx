import React, { Component } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.queryParams = queryString.parse(window.location.search)
    this.socket = io('http://localhost:3001')
    this.state = {
      message: '',
      currentOnlineUsers: [],
      messages: []
    }
  }
  
  render() {
    return (
      <section className="room">
        <h1>Room</h1>
        <div className="chat">
          <div className="chat-users">
            {
              this.state.currentOnlineUsers.length > 0
                ?
                  <ul className="chat-users-list">
                    {this.state.currentOnlineUsers.map(onlineUser => {
                      return (
                        <li key={onlineUser.username}>{onlineUser.username}</li>
                      )
                    })}
                  </ul>
                : null
            }
          </div>
          {
            this.state.messages.length > 0
              ?
                <ul className="chat-messages">
                  {this.state.messages.map((message, idx) => {
                    return (
                      <li key={idx}>{message.content}</li>
                    )
                  })}
                </ul>
              : null
          }
        </div>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="field">
            <input type="text" name="message" id="message" onChange={(e) => this.handleInputChange(e)} value={this.state.message} placeholder="Type here your message"/>
          </div>
          <div className="form-actions">
            <input type="submit" value="Send message"/>
          </div>
        </form>
      </section>
    )
  }

  handleFormSubmit(e) {
    e.preventDefault()
    // Sent a message to the others users in the room
    this.socket.emit('user-send-message-room', { content: this.state.message, room: this.queryParams.room })
    this.setState({ ...this.state, message: '' })
  }

  handleInputChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  componentDidMount() {
    // User connects to a room
    this.socket.emit('user-join-room', { username: this.props.loggedInUser.username, username: this.props.loggedInUser.username })

    // Rest of users recieve that someone connected to their room
    this.socket.on('user-join-room', (data) => {
      this.setState({ ...this.state, currentOnlineUsers: data.currentOnlineUsers })
      console.log("SOMEONE JOINED THE ROOM: NEED TO UPDATE THE CURRENT ONLINE USERS", this.state)
    })

    // Other users detect that someone sent a message
    this.socket.on('user-send-message-room', (data) => {
      console.log("User sent a new message:", data)
      let newMessages = [...this.state.messages]
      newMessages.push({ username: data.username, content: data.content })
      this.setState({ ...this.state, messages: newMessages })
    })

    // Other users detect that someone left the room
    this.socket.on('user-left-room', (data) => {
      console.log("User left the room", data)
      this.setState({ ...this.state, currentOnlineUsers: data.currentOnlineUsers })
      console.log("USER LEFT THE ROOM", this.state)
    })

    // Other users detect that they have to update their current users online list
    this.socket.on('update-online-users', (data) => {
      console.log("The user forced disconnect", data)
      this.setState({ ...this.state, currentOnlineUsers: data.currentOnlineUsers })
      console.log("NEED TO UPDATE THE CURRENT USERS ONLINE", this.state)
    })
  }

  componentWillUnmount() {
    // Stop listening for events
    this.socket.off('user-join-room')
    this.socket.off('update-online-users')
    this.socket.off('user-left-room')
    this.socket.off('user-send-message-room')
    
    // Send to the other users that someone left the room
    this.socket.emit('user-left-room', { username: this.props.loggedInUser.username })
  }
}
