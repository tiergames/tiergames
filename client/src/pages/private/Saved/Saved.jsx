import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReviewsService from '../../../services/reviews.service'
import ReviewTile from '../../../components/ReviewTile/ReviewTile'

export default class Saved extends Component {
  constructor(props) {
    super(props)
    this.reviewsService = new ReviewsService()
    this.state = {
      savedReviews: [],
      isLoadingSavedReviews: true,
      savedGames: [],
      isLoadingSavedGames: true
    }
  }
  
  render() {
    return (
      <section className="saved">
        <h2 className="section-title">Saved reviews</h2>
        {this.renderSavedReviews()}
      </section>
    )
  }

  componentDidMount() {
    this.loadSavedReviews()
  }

  renderSavedReviews() {
    return (
      <>
        {
          this.state.isLoadingSavedReviews
            ? <p>Loading saved reviews...</p>
            :
              <ul>
                {
                this.state.savedReviews.map(savedReview => {
                  return (
                    <Link to={`/reviews/${savedReview._id}`} key={savedReview._id}>
                      <ReviewTile key={savedReview._id} gameTile={savedReview} />
                    </Link>
                  )
                })
              }
              </ul>
        }
      </>
    )
  }

  async loadSavedReviews() {
    let savedReviews = await this.reviewsService.getReviewsPerUser(this.props.loggedInUser._id)
    this.setState({ ...this.state, savedReviews: savedReviews, isLoadingSavedReviews: false })
  }
}
