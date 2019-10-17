import React, { Component } from 'react'
import ProfileService from '../../../services/profile.service'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.profileService = new ProfileService()
    this.state = {
      userProfile: {},
      isLoadingUserProfile: true
    }
  }

  render() {
    return (
      <>
        {
          this.state.isLoadingUserProfile
            ? <p>Loading user profile...</p>
            : this.renderUserProfile()
        }
      </>
    )
  }

  renderUserProfile() {
    return (
      <section className="profile">
        <h2>{this.state.userProfile.username}</h2>
        {
          this.state.userProfile.followers.indexOf(this.props.loggedInUser._id) >= 0
            ? <button onClick={() => this.handleUnfollowUser(this.state.userProfile)}>Unfollow</button>
            : <button onClick={() => this.handleFollowUser(this.state.userProfile)}>Follow</button>
        }
      </section>
    )
  }

  componentDidMount() {
    let username = this.props.match.params.username
    this.loadUserProfile(username)
  }

  async handleFollowUser(followed) {
    let followRequest = await this.profileService.follow(followed, this.props.loggedInUser)
    if (followRequest.followRequest) {
      let newUserProfile = {...this.state.userProfile}
      newUserProfile.followers = followRequest.followed.followers
      this.setState({ ...this.state, userProfile: newUserProfile })
    } else {
      alert('Something went wrong')
    }
  }

  async handleUnfollowUser(followed) {
    let unfollowRequest = await this.profileService.unfollow(followed, this.props.loggedInUser)
    if (unfollowRequest.unfollowRequest) {
      let newUserProfile = {...this.state.userProfile}
      newUserProfile.followers = unfollowRequest.unfollowed.followers
      this.setState({ ...this.state, userProfile: newUserProfile })
    }
  }

  async loadUserProfile(username) {
    let userProfile = await this.profileService.getProfile(username)
    this.setState({
      ...this.state,
      userProfile: userProfile.userProfile,
      isLoadingUserProfile: false
    })
    console.log("THE PROPS USER", this.props.loggedInUser._id)
    console.log("THE STATE USER", this.state.userProfile.followers)
    if (this.state.userProfile.followers.indexOf(this.props.loggedInUser._id) >= 0) {
      console.log("FOLLOWING: YES!!!!")
    } else {
      console.log("NOT FOLLOWING")
    }
  }
}
