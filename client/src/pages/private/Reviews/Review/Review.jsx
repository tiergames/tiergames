import React, { Component } from 'react'
import ReviewsService from '../../../../services/reviews.service'

export default class Review extends Component {
  constructor(props) {
    super(props)
    console.log("THE PROPS", props)
    this.reviewsService = new ReviewsService()
    this.state = {
      review: null,
      isLoadingReview: []
    }
  }
  
  render() {
    return (
      <section className="review">
        {
          this.state.isLoadingReview
            ? <p>Loading review...</p>
            : this.renderReview()
        }
      </section>
    )
  }

  componentDidMount() {
    this.loadReviewData()
  }

  async loadReviewData() {
    let reviewData = await this.reviewsService.getReviewData(this.props.match.params.reviewID)
    console.log("REVIEW DATA", reviewData)
    this.setState({ ...this.state, review: reviewData, isLoadingReview: false })
  }

  renderReview() {
    return (
      <>
        <header>
          <div>
            {/* TODO: load game cover here */}
            <span>Load game cover here</span>
          </div>
          <div>
            <p>{this.state.review.platform.name}</p>
            <h2>{this.state.review.gameName}</h2>
          </div>
        </header>
        <section className="review-stats">
          <div>
            <p><strong><span>{this.state.review.followers.length}</span></strong> users follow this review</p>
          </div>
          <div className="following-and-rating">
            <button>Follow</button>
            <div className="rating">
              <span>{this.state.review.totalRating}</span>
            </div>
          </div>
        </section>
        <section>
          <h2>{this.state.review.title}</h2>
          <p>{this.state.review.review}</p>
          <section>
            <h3>History</h3>
            <p>{this.state.review.history.content}</p>
            <span className="category-rating">{this.state.review.history.rating}</span>
          </section>
          <section>
            <h3>Gameplay</h3>
            <p>{this.state.review.gameplay.content}</p>
            <span className="category-rating">{this.state.review.gameplay.rating}</span>
          </section>
          <section>
            <h3>Graphics</h3>
            <p>{this.state.review.graphics.content}</p>
            <span className="category-rating">{this.state.review.graphics.rating}</span>
          </section>
          <section>
            <h3>Sound</h3>
            <p>{this.state.review.sound.content}</p>
            <span className="category-rating">{this.state.review.sound.rating}</span>
          </section>
        </section>
        <section className="comments">
          <h2>Comments</h2>
          {
            this.state.isLoadingComments
              ? <p>Loading comments...</p>
              : this.renderComments()
          }
        </section>
      </>
    )
  }

  renderComments() {
    return (
      <>
        {
          this.state.review.comments.length > 0
            ? this.state.review.comments.map((comment) => {
                return (
                  <div className="comment">
                    <div className="comment-user">
                      
                    </div>
                    <div className="comment-content">
                      {comment.content}
                    </div>
                  </div>
                )
              })
            : <p>There are no comments yet.</p>
        }
      </>
    )
  }
}
