import React, { Component } from 'react'
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
      <article className="review-title" style={{"backgroundImage": `url(http:${this.state.gameTile.coverUrl})`}}>
        <div>
          {console.log("THE GOOD STATE", this.state)}
          <p>{this.state.gameTile.totalRating}</p>
          <h2>{this.state.gameTile.title}</h2>
          {this.state.isLoadingGameTitle
            ?
              <p>Loading game title...</p>
            :
              <p>{this.state.gameTile.name}</p>
          }
          <p>{this.state.gameTile.platform.name}</p>
          <p>{this.state.gameTile.author.username}</p>
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
    console.log("Reemplazado", gameCoverUrl)
    let newGameTile = {...this.state.gameTile}
    newGameTile.coverUrl = gameCoverUrl
    this.setState({
      ...this.state,
      gameTile: newGameTile
    })
  }
}
