import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoggedInUserProfile extends Component {
  constructor(props) {
    super()
  }

  render() {
    console.log("FOLLOWERS", this.props.loggedInUser.followers)
    return (
      <div>
        
        <h1>User profile</h1>
        <p><strong>Username: </strong>{this.props.loggedInUser.username} </p>
        <section className="followers">
          <h2>Followers ({this.props.loggedInUser.followers.length})</h2>
          {this.renderFollowers()}
        </section>
        <section className="following">
          <h2>Following ({this.props.loggedInUser.following.length})</h2>
          {this.renderFollowing()}
        </section>
      </div>
    )
  }

  renderFollowers() {
    return (
      this.props.loggedInUser.followers.length > 0
        ? 
          <ul>
            {this.props.loggedInUser.followers.map(follower => {
              return (
                <li><Link to={`/profile/${follower.username}`}>{follower.username}</Link></li>
              )
            })}
          </ul>
        : <p>You have no followers yet</p>
    )
  }

  renderFollowing() {
    return (
      this.props.loggedInUser.following.length > 0
        ? 
          <ul>
            {this.props.loggedInUser.following.map(userFollowed => {
              return (
                <li><Link to={`/profile/${userFollowed.username}`}>{userFollowed.username}</Link></li>
              )
            })}
          </ul>
        : <p>You don't follow anybody yet.</p>
    )
  }
}
