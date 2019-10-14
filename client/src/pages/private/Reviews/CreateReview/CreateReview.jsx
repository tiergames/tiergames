import React, { Component } from 'react'
import ReviewsService from '../../../../services/reviews.service'

export default class CreateReview extends Component {
  constructor(props) {
    super(props)

    this.reviewsService = new ReviewsService()
    
    this.state = {
      title: '',
      platform: '',
      review: '',
      historyContent: '',
      historyRating: '',
      graphicsContent: '',
      graphicsRating: '',
      soundContent: '',
      soundRating: '',
      gameplayContent: '',
      gameplayRating: '',
      author: props.loggedInUser._id,
      pros: '',
      cons: '',
      gameID: ''
    }
  }
  
  render() {
    return (
      <section>
        <h2>New review</h2>
        <form onSubmit={(e) => this.handleCreateReviewFormSubmit(e)}>
          <div className="field">
            <input type="search" name="game" id="game" placeholder={"The game for the review"}/>
            <label htmlFor="game" className="label">Game</label>
          </div>
          <div className="field">
            <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.title} name="title" id="title" placeholder="Title of the review" />
            <label htmlFor="title" className="label">Title</label>
          </div>
          <div className="field">
            <select name="platform" onChange={(e) => this.handleInputChange(e)} value={this.state.platform} id="platform">
              {this.props.platforms.map(platform => {
                return <option key={platform._id} value={platform._id}>{platform.name}</option>
              })}
            </select>
            <label htmlFor="platform" className="label">Platform</label>
          </div>
          <div className="field">
            <textarea name="review" onChange={(e) => this.handleInputChange(e)} value={this.state.review} id="review"></textarea>
            <label htmlFor="review" className="label">Review content</label>
          </div>
          <div className="form-section">
            <h3>History content</h3>
            <div className="field">
              <textarea name="historyContent" onChange={(e) => this.handleInputChange(e)} value={this.state.historyContent} id="history-content"></textarea>
              <label htmlFor="history-content">History content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" name="history-rating" value="1" id="history-rating-1"/>
                <label htmlFor="history-rating-1" className="star">1</label>
                <input type="radio" name="history-rating" value="2" id="history-rating-2"/>
                <label htmlFor="history-rating-2" className="star">2</label>
                <input type="radio" name="history-rating" value="3" id="history-rating-3"/>
                <label htmlFor="history-rating-3" className="star">3</label>
                <input type="radio" name="history-rating" value="4" id="history-rating-4"/>
                <label htmlFor="history-rating-4" className="star">4</label>
                <input type="radio" name="history-rating" value="5" id="history-rating-5"/>
                <label htmlFor="history-rating-5" className="star">5</label>
              </div>
              <label htmlFor="history-rating" className="label">History rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Graphics content</h3>
            <div className="field">
              <textarea name="graphicsContent" onChange={(e) => this.handleInputChange(e)} value={this.state.graphicsContent} id="graphic-content"></textarea>
              <label htmlFor="graphic-content">Graphic content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" name="graphic-rating" value="1" id="graphic-rating-1"/>
                <label htmlFor="graphic-rating-1" className="star">1</label>
                <input type="radio" name="graphic-rating" value="2" id="graphic-rating-2"/>
                <label htmlFor="graphic-rating-2" className="star">2</label>
                <input type="radio" name="graphic-rating" value="3" id="graphic-rating-3"/>
                <label htmlFor="graphic-rating-3" className="star">3</label>
                <input type="radio" name="graphic-rating" value="4" id="graphic-rating-4"/>
                <label htmlFor="graphic-rating-4" className="star">4</label>
                <input type="radio" name="graphic-rating" value="5" id="graphic-rating-5"/>
                <label htmlFor="graphic-rating-5" className="star">5</label>
              </div>
              <label htmlFor="graphic-rating" className="label">Graphic rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Sound content</h3>
            <div className="field">
              <textarea name="soundContent" onChange={(e) => this.handleInputChange(e)} value={this.state.soundContent} id="sound-content"></textarea>
              <label htmlFor="sound-content">Sound content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" name="sound-rating" value="1" id="sound-rating-1"/>
                <label htmlFor="sound-rating-1" className="star">1</label>
                <input type="radio" name="sound-rating" value="2" id="sound-rating-2"/>
                <label htmlFor="sound-rating-2" className="star">2</label>
                <input type="radio" name="sound-rating" value="3" id="sound-rating-3"/>
                <label htmlFor="sound-rating-3" className="star">3</label>
                <input type="radio" name="sound-rating" value="4" id="sound-rating-4"/>
                <label htmlFor="sound-rating-4" className="star">4</label>
                <input type="radio" name="sound-rating" value="5" id="sound-rating-5"/>
                <label htmlFor="sound-rating-5" className="star">5</label>
              </div>
              <label htmlFor="sound-rating" className="label">Sound rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Gameplay content</h3>
            <div className="field">
              <textarea name="gameplayContent" onChange={(e) => this.handleInputChange(e)} value={this.state.gameplayContent} id="gameplay-content"></textarea>
              <label htmlFor="gameplay-content">Gameplay content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" name="gameplay-rating" value="1" id="gameplay-rating-1"/>
                <label htmlFor="gameplay-rating-1" className="star">1</label>
                <input type="radio" name="gameplay-rating" value="2" id="gameplay-rating-2"/>
                <label htmlFor="gameplay-rating-2" className="star">2</label>
                <input type="radio" name="gameplay-rating" value="3" id="gameplay-rating-3"/>
                <label htmlFor="gameplay-rating-3" className="star">3</label>
                <input type="radio" name="gameplay-rating" value="4" id="gameplay-rating-4"/>
                <label htmlFor="gameplay-rating-4" className="star">4</label>
                <input type="radio" name="gameplay-rating" value="5" id="gameplay-rating-5"/>
                <label htmlFor="gameplay-rating-5" className="star">5</label>
              </div>
              <label htmlFor="gameplay-rating" className="label">Gameplay rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Pros and cons</h3>
            <div className="field">
              <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.pros} name="pros" id="pros"/>
              <label htmlFor="pros" className="label">Pros</label>
            </div>
            <div className="field">
              <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.cons} name="cons" id="cons"/>
              <label htmlFor="cons" className="label">Cons</label>
            </div>
          </div>
          <div className="form-actions">
            <input type="submit" value="Create"/>
          </div>
        </form>
      </section>
    )
  }

  async handleCreateReviewFormSubmit(e) {
    e.preventDefault()
    console.log("TARGET", e.target)
    await this.reviewsService.createReview(this.state, this.props.loggedInUser._id)
  }

  handleInputChange (e) {
    let newState = {...this.state}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }
}
