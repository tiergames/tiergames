import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GamesService from '../../services/games.service'

export default class ReviewTile extends Component {
  constructor(props) {
    super(props)
    this.gamesService = new GamesService()
    this.state = {
      isLoadingGameTitle: true,
      gameTile: this.props.gameTile
    }
  }
  
  render() {
    return (
      <article className="review-tile">
        <div className="review-tile-game-cover">
          {
            this.state.isLoadingGameTitle
              ? null
              : <img src={`http:${this.state.gameTile.coverUrl}`} />
          }
        </div>
        <div className="review-tile-content">
          <div className="review-tile-rating">
            <p>{this.state.gameTile.totalRating}</p>
          </div>
          <div className="review-title-resume">
            <h2>{this.state.gameTile.title}</h2>
            {this.state.isLoadingGameTitle
              ?
                <p>Loading game title...</p>
              :
                <p>{this.state.gameTile.name}</p>
            }
            <p>by <Link to={`/profile/${this.state.gameTile.author.username}`}>{this.state.gameTile.author.username}</Link></p>
          </div>
        </div>
      </article>
    )
  }

  async componentDidMount() {
    this.loadGameName()
    this.loadGameCover()
  }

  async loadGameName () {
    let gameName = await this.gamesService.getGameName(this.state.gameTile.gameID)
    let newGameTile = {...this.state.gameTile}
    newGameTile.name = gameName.name
    this.setState({
      ...this.state,
      gameTile: newGameTile,
      isLoadingGameTitle: false
    })
  }

  async loadGameCover () {
    let gameCoverUrl = await this.gamesService.getGameCover(this.state.gameTile.gameID)
    gameCoverUrl = gameCoverUrl.replace('thumb', 'screenshot_med')
    let newGameTile = {...this.state.gameTile}
    newGameTile.coverUrl = gameCoverUrl
    this.setState({
      ...this.state,
      gameTile: newGameTile
    })
  }
}
