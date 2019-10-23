import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class GameTileInfo extends Component {
  constructor(props) {
    super(props)
    this.game = props.game
  }
  
  render() {
    return (
      <li className="game-tile-info">
        <Link to={`/games/${this.game.id}`}>
          <div className="game-tile-info-image">
          {
            this.game.cover
            ?
              <img src={`http://${this.game.cover.url.replace('thumb', 'cover_small_2x')}`} alt={this.game.name}/>
            : null
          }
          </div>
          <div className="game-tile-info-content">
            <ul className="game-tile-info-platforms">
              {
                this.game.platforms
                ?
                  this.game.platforms.map(platform => {
                    return (
                      <li key={platform.id}>{platform.name}</li>
                    )
                  })
                : <p>Platform unknown</p>
              }
            </ul>
            <h2 className="game-tile-info-game-name">{this.game.name}</h2>
            <ul className="game-tile-info-categories">
              
            </ul>
          </div>
        </Link>
      </li>
    )
  }
}
