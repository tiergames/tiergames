import React, { Component } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.queryParams = queryString.parse(window.location.search)
    this.socket = io('http://localhost:3001')
    this.state = {
      message: ''
    }
  }
  
  render() {
    return (
      <section className="room">
        <h1>Room</h1>
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
    this.socket.emit('user-send-message-room', { message: this.state.message, room: this.queryParams.room })
  }

  handleInputChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  componentDidMount() {
    this.socket.emit('user-join-room', { username: this.props.loggedInUser.username, room: this.queryParams.room })
    this.socket.on('user-send-message-room', (data) => {
      console.log("User sent a new message:", data)
    })
  }
}
