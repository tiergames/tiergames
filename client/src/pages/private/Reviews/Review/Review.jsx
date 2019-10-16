import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReviewsService from '../../../../services/reviews.service'
import ReviewCommentsService from './../../../../services/reviewComments.service'

export default class Review extends Component {
  constructor(props) {
    super(props)

    this.reviewsService = new ReviewsService()
    this.reviewCommentsService = new ReviewCommentsService()

    this.state = {
      review: null,
      isLoadingReview: [],
      comment: { content: '', authorID: this.props.loggedInUserID, reviewID: this.props.match.params.reviewID },
      comments: {
        comments: [], isLoadingComments: true,
        pagination: { currentPage: 0, offset: 0, limit: 10 }
      },
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
    this.loadComments()
  }

  async loadReviewData() {
    let reviewData = await this.reviewsService.getReviewData(this.props.match.params.reviewID)
    console.log("REVIEW DATA", reviewData)
    this.setState({ ...this.state, review: reviewData, isLoadingReview: false })
  }

  async loadComments() {
    let newComments = {...this.state.comments}
    newComments.isLoadingComments = true
    
    let comments = await this.reviewCommentsService.loadComments(this.state.comments.pagination.offset, this.state.comments.pagination.limit)

    newComments.pagination.pagcurrentPage += 1;
    newComments.pagination.offset = newComments.pagination.currentPage * newComments.pagination.limit
    newComments.comments = comments.comments
    newComments.isLoadingComments = false

    this.setState({ ...this.state, comments: newComments })
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
          {this.renderComments()}
        </section>
      </>
    )
  }

  renderComments() {
    return (
      <>
        <form className="comment-form" onSubmit={e => this.handleFormSubmit(e)}>
          <div className="field">
            <textarea onChange={(e) => this.handleCommentChange(e)} type="text" name="content" placeholder="Write a comment" value={this.state.comment.content} id="comment-text"></textarea>
            <label htmlFor="comment-text" className="label">Comment</label>
          </div>
          <div className="form-actions">
            <input type="submit" value="Send"/>
          </div>
        </form>
        <div className="user-comments">
          {
            this.state.comments.comments.length > 0
              ? this.state.comments.comments.map((comment) => {
                  return (
                    <div className="comment" key={comment._id}>
                      <div className="comment-user">
                        <p><strong>User: </strong>{comment.authorID.username}</p>
                      </div>
                      <div className="comment-content">
                        {comment.content}
                      </div>
                    </div>
                  )
                })
              : <p>There are no comments yet.</p>
          }
        </div>
        <div className="comments-load-more">
          {
            this.state.comments.isLoadingComments
              ? <Link to={""}>Loading...</Link>
              : <Link onClick={() => this.loadComments()} to={"#"}>Load more</Link>
          }
        </div>
      </>
    )
  }

  handleCommentChange(e) {
    let newComment = {...this.state.comment}
    newComment[e.target.name] = e.target.value
    this.setState({ ...this.state, comment: newComment })
  }

  async handleFormSubmit(e) {
    e.preventDefault()
    let commentAdded = await this.reviewCommentsService.addComment(this.state.comment)
    
    if (commentAdded.commentCreated) {
      console.log(commentAdded)
      let newComments = {...this.state.comments}
      newComments.comments.unshift(commentAdded.commentCreated)
      this.setState({ ...this.state, comments: newComments })
    }
  }
}
