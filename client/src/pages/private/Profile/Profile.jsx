import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import ProfileService from '../../../services/profile.service'
import ReviewsService from '../../../services/reviews.service'
import ReviewTile from '../../../components/ReviewTile/ReviewTile'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.profileService = new ProfileService()
    this.reviewsService = new ReviewsService()
    this.socket = io(`${process.env.REACT_APP_SERVER_BASE_URL}`)
    this.state = {
      userProfile: {},
      isLoadingUserProfile: true,
      userReviews: [],
      isLoadingUserReviews: true
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
        {this.renderUserReviews()}
      </>
    )
  }

  componentDidMount() {
    let username = this.props.match.params.username
    this.loadUserProfile(username)
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

  renderUserReviews() {
    return (
      <section className="user-reviews">
        <h2>{this.state.isLoadingUserProfile ? 'user' : this.state.userProfile.username}'s reviews ({!this.state.isLoadingUserReviews ? this.state.userReviews.length : 'loading...'})</h2>
        {
          this.state.userReviews.length > 0
            ?
              <ul>
                {this.state.userReviews.map(review => {
                  return (
                    <Link to={`/reviews/${review._id}`} key={review._id}>
                      <ReviewTile gameTile={review} />
                    </Link>
                  )
                })}
              </ul>
            :
              this.state.isLoadingUserReviews
                ? <p>Loading reviews...</p>
                : <p>You don't have any saved reviews.</p>
        }
      </section>
    )
  }

  async handleFollowUser(followed) {
    let followRequest = await this.profileService.follow(followed, this.props.loggedInUser)
    if (followRequest.followRequest) {
      let newUserProfile = {...this.state.userProfile}
      newUserProfile.followers = followRequest.followed.followers
      this.setState({ ...this.state, userProfile: newUserProfile })
      this.socket.emit('new-follower', {
        follower: {
          _id: this.props.loggedInUser._id,
          username: this.props.loggedInUser.username
        },
        followed: {
          _id: followed._id
        }
      })
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
    this.loadUserReviews()
  }

  async loadUserReviews() {
    let userReviews = await this.reviewsService.getReviewsPerUser(this.state.userProfile._id)
    this.setState({ ...this.state, userReviews: userReviews, isLoadingUserReviews: false })
  }
}
