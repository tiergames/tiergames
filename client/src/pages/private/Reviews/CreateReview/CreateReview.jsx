import React, { Component } from 'react'
import ReviewsService from '../../../../services/reviews.service'
import queryString from 'query-string'
import GamesService from '../../../../services/games.service'

export default class CreateReview extends Component {
  constructor(props) {
    super(props)

    this.reviewsService = new ReviewsService()
    this.gamesService = new GamesService()

    const queryParams = queryString.parse(window.location.search);
    
    this.state = {
      title: '',
      platform: '',
      review: '',
      history: { content: '', rating: '' },
      graphics: { content: '', rating: '' },
      sound: { content: '', rating: '' },
      gameplay: { content: '', rating: '' },
      author: props.loggedInUser._id,
      pros: '',
      cons: '',
      gameName: '',
      isLoadingGameName: true,
      gameID: queryParams.game ? queryParams.game : ''
    }
  }
  
  render() {
    return (
      <section>
        <h2>New review</h2>
        <form onSubmit={(e) => this.handleCreateReviewFormSubmit(e)}>
          <input type="hidden" name="gameID" value={this.state.gameID}/>
          <input type="hidden" name="gameName" value={this.state.gameName}/>
          <div className="field">
            <input type="text" disabled name="game" id="game" value={this.state.isLoadingGameName ? 'Loading name...' : this.state.gameName} placeholder={"The game for the review"}/>
            <label htmlFor="game" className="label">Game</label>
          </div>
          <div className="field">
            <input type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.title} name="title" id="title" placeholder="Title of the review" />
            <label htmlFor="title" className="label">Title</label>
          </div>
          <div className="field">
            <div className="platforms-selection">
              {this.props.platforms.map(platform => {
                return (
                  <div className="platforms-selection-tag" key={platform._id}>
                    <input type="radio" onClick={e => this.handleInputChange(e)} id={platform._id} name="platform" value={platform._id} />
                    <label htmlFor={platform._id}>{platform.name}</label>
                  </div>
                )
              })}
            </div>
            <label htmlFor="platform" className="label">Platform</label>
          </div>
          <div className="field">
            <textarea name="review" onChange={(e) => this.handleInputChange(e)} value={this.state.review} id="review"></textarea>
            <label htmlFor="review" className="label">Review content</label>
          </div>
          <div className="form-section">
            <h3>History content</h3>
            <div className="field">
              <textarea name="historyContent" onChange={(e) => this.handleInputChange(e, "history")} value={this.state.history.content} id="history-content"></textarea>
              <label htmlFor="history-content">History content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "history")} name="historyRating" value="1" id="history-rating-1"/>
                <label htmlFor="history-rating-1" className="star">1</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "history")} name="historyRating" value="2" id="history-rating-2"/>
                <label htmlFor="history-rating-2" className="star">2</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "history")} name="historyRating" value="3" id="history-rating-3"/>
                <label htmlFor="history-rating-3" className="star">3</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "history")} name="historyRating" value="4" id="history-rating-4"/>
                <label htmlFor="history-rating-4" className="star">4</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "history")} name="historyRating" value="5" id="history-rating-5"/>
                <label htmlFor="history-rating-5" className="star">5</label>
              </div>
              <label htmlFor="history-rating" className="label">History rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Graphics content</h3>
            <div className="field">
              <textarea name="graphicsContent" onChange={(e) => this.handleInputChange(e, "graphics")} value={this.state.graphics.content} id="graphic-content"></textarea>
              <label htmlFor="graphic-content">Graphic content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "graphics")} name="graphicsRating" value="1" id="graphic-rating-1"/>
                <label htmlFor="graphic-rating-1" className="star">1</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "graphics")} name="graphicsRating" value="2" id="graphic-rating-2"/>
                <label htmlFor="graphic-rating-2" className="star">2</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "graphics")} name="graphicsRating" value="3" id="graphic-rating-3"/>
                <label htmlFor="graphic-rating-3" className="star">3</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "graphics")} name="graphicsRating" value="4" id="graphic-rating-4"/>
                <label htmlFor="graphic-rating-4" className="star">4</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "graphics")} name="graphicsRating" value="5" id="graphic-rating-5"/>
                <label htmlFor="graphic-rating-5" className="star">5</label>
              </div>
              <label htmlFor="graphic-rating" className="label">Graphic rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Sound content</h3>
            <div className="field">
              <textarea name="soundContent" onChange={(e) => this.handleInputChange(e, "sound")} value={this.state.sound.content} id="sound-content"></textarea>
              <label htmlFor="sound-content">Sound content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "sound")} name="soundRating" value="1" id="sound-rating-1"/>
                <label htmlFor="sound-rating-1" className="star">1</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "sound")} name="soundRating" value="2" id="sound-rating-2"/>
                <label htmlFor="sound-rating-2" className="star">2</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "sound")} name="soundRating" value="3" id="sound-rating-3"/>
                <label htmlFor="sound-rating-3" className="star">3</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "sound")} name="soundRating" value="4" id="sound-rating-4"/>
                <label htmlFor="sound-rating-4" className="star">4</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "sound")} name="soundRating" value="5" id="sound-rating-5"/>
                <label htmlFor="sound-rating-5" className="star">5</label>
              </div>
              <label htmlFor="sound-rating" className="label">Sound rating</label>
            </div>
          </div>
          <div className="form-section">
            <h3>Gameplay content</h3>
            <div className="field">
              <textarea name="gameplayContent" onChange={(e) => this.handleInputChange(e, "gameplay")} value={this.state.gameplay.content} id="gameplay-content"></textarea>
              <label htmlFor="gameplay-content">Gameplay content</label>
            </div>
            <div className="field">
              <div className="stars-validation">
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "gameplay")} name="gameplayRating" value="1" id="gameplay-rating-1"/>
                <label htmlFor="gameplay-rating-1" className="star">1</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "gameplay")} name="gameplayRating" value="2" id="gameplay-rating-2"/>
                <label htmlFor="gameplay-rating-2" className="star">2</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "gameplay")} name="gameplayRating" value="3" id="gameplay-rating-3"/>
                <label htmlFor="gameplay-rating-3" className="star">3</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "gameplay")} name="gameplayRating" value="4" id="gameplay-rating-4"/>
                <label htmlFor="gameplay-rating-4" className="star">4</label>
                <input type="radio" onClick={e => this.handleSelectInputChange(e, "gameplay")} name="gameplayRating" value="5" id="gameplay-rating-5"/>
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

  componentDidMount() {
    this.loadGameName()
  }

  async loadGameName() {
    if (this.state.gameID !== '') {
      // let gameName = await 
      let gameName = await this.gamesService.getGameName(this.state.gameID)
      this.setState({
        ...this.state,
        gameName: gameName.name,
        isLoadingGameName: false
      })
    }
  }

  async handleCreateReviewFormSubmit(e) {
    e.preventDefault()
    let reviewCreated = await this.reviewsService.createReview(this.state)

    // TODO: Remove the alert for a nice modal
    if (reviewCreated.created) alert('Review created successfully')
  }

  handleSelectInputChange(e, category) {
    let newState = {...this.state}

    if (e.target.name === 'platform') { newState.platform = e.target.value }
    else { newState[category].rating = +e.target.value }

    this.setState(newState)
  }

  handleInputChange (e, category) {
    let newState = {...this.state}
    if (category) { newState[category].content = e.target.value }
    else { newState[e.target.name] = e.target.value }
    this.setState(newState)
  }
}
