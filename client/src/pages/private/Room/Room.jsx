import React, { Component } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.queryParams = queryString.parse(window.location.search)
    this.socket = io(`${process.env.REACT_APP_SERVER_BASE_URL}`)
    this.state = {
      message: '',
      currentOnlineUsers: [],
      messages: [],
      showChat: true
    }
  }
  
  render() {
    return (
      <section className="room">
        {this.renderRoomTabs()}
        {this.state.showChat && this.renderChat()}
        {!this.state.showChat && this.renderConnectedUsers()}
      </section>
    )
  }

  renderRoomTabs() {
    return (
      <div className="room-tabs">
        <button data-tab-button="chat" className="active" onClick={(e) => {this.setState({showChat: true}); this.setActiveTabButton(e); }}>Chat</button>
        <button data-tab-button="users" onClick={(e) => {this.setState({showChat: false}); this.setActiveTabButton(e); }}>Users</button>
      </div>
    )
  }

  renderChat() {
    return (
      <div className="chat">
        {
          this.state.messages.length > 0
            ?
              <ul className="chat-messages">
                {this.state.messages.map((message, idx) => {
                  return (
                    <li key={idx} className={`message ${message.username === this.props.loggedInUser.username ? 'me' : ''}`}>
                      <span className="message-username-letter">{message.username.charAt(0)}</span>
                      <span className="message-content">
                        <span className="message-username">
                          {message.username === this.props.loggedInUser.username ? 'me' : message.username}
                        </span>
                        {message.content}
                      </span>
                    </li>
                  )
                })}
              </ul>
            : null
        }
        <form className="chat-form" onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="field">
            <input type="text" className="chat-form-message" name="message" id="message" onChange={(e) => this.handleInputChange(e)} value={this.state.message} placeholder="Type here your message"/>
          </div>
          <div className="form-actions">
            <input type="submit" value="Send message"/>
          </div>
        </form>
      </div>
    )
  }

  renderConnectedUsers() {
    return (
      <div className="chat-users">
        {
          this.state.currentOnlineUsers.length > 0
            ?
              <ul className="chat-users-list">
                {this.state.currentOnlineUsers.map(onlineUser => {
                  return (
                    <li key={onlineUser.username}>
                      <span className="chat-user-letter">{onlineUser.username.charAt(0)}</span>
                      <span className="chat-user-username">{onlineUser.username}</span>
                    </li>
                  )
                })}
              </ul>
            : null
        }
      </div>
    )
  }

  setActiveTabButton(e) {
    const buttonClicked = e.target

    if (e.target.dataset.tabButton === "chat") buttonClicked.nextSibling.classList = ''
    else buttonClicked.previousSibling.classList = ''
    
    buttonClicked.classList = 'active'
  }

  handleFormSubmit(e) {
    e.preventDefault()
    // Sent a message to the others users in the room
    this.socket.emit('user-send-message-room', { content: this.state.message, username: this.props.loggedInUser.username, room: this.queryParams.room })
    this.setState({ ...this.state, message: '' })
  }

  handleInputChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  componentDidMount() {
    // User connects to a room
    this.socket.emit('user-join-room', { username: this.props.loggedInUser.username, room: this.queryParams.room })

    // Get the room messages
    this.socket.on('get-room-messages', (data) => {
      this.setState({ ...this.state, messages: data.messages })
    })

    // Rest of users recieve that someone connected to their room
    this.socket.on('user-join-room', (data) => {
      this.setState({ ...this.state, currentOnlineUsers: data.currentOnlineUsers })
    })

    // Other users detect that someone sent a message
    this.socket.on('user-send-message-room', (data) => {
      let newMessages = [...this.state.messages]
      newMessages.push({ username: data.username, content: data.content })
      this.setState({ ...this.state, messages: newMessages })
    })

    // Other users detect that someone left the room
    this.socket.on('user-left-room', (data) => {
      this.setState({ ...this.state, currentOnlineUsers: data.currentOnlineUsers })
    })

    // Other users detect that they have to update their current users online list
    this.socket.on('update-online-users', (data) => {
      this.setState({ ...this.state, currentOnlineUsers: data.currentOnlineUsers })
    })
  }

  componentDidUpdate = () => {
    if (document.querySelector('.chat-messages'))
      document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight
  };

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
