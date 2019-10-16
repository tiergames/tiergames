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
        <button>Follow</button>
      </section>
    )
  }

  componentDidMount() {
    console.log(this.props)
    let username = this.props.match.params.username
    this.loadUserProfile(username)
  }

  async loadUserProfile(username) {
    let userProfile = await this.profileService.getProfile(username)
    this.setState({
      ...this.state,
      userProfile: userProfile.userProfile,
      isLoadingUserProfile: false
    })
  }
}
