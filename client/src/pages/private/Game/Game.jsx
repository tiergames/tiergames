import React, { Component } from 'react'
import GamesService from './../../../services/games.service'

export default class Game extends Component {
  constructor(props) {
    super()
    this.gamesService = new GamesService()
    this.state = {
      game: {},
      isLoadingGame: true
    }
  }
  
  render() {
    return (
      <section className="game">
        
      </section>
    )
  }

  componentDidMount() {
    let gameID = this.props.match.params.gameID
    this.loadGame(gameID)
    this.loadGameName(gameID)
  }

  renderGame() {
    <>
      <h2>{this.state.game.title}</h2>
    </>
  }

  async loadRelatedGames() {

  }

  async loadGame(gameID) {
    let game = await this.gamesService.getGameData(gameID)
    this.setState({ isLoadingGame: false, game })
  }
}
