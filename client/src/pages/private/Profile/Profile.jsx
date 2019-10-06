import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        
        <h1>User profile</h1>
        <p><strong>Username: </strong>{this.props.loggedInUser.username} </p>
      </div>
    )
  }
}
