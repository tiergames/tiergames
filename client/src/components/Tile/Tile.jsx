import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Tile extends Component {
  constructor(props) {
    super(props)
    this.type = props.type
    this.tileInfo = props.tileInfo
  }
  
  render() {
    return (
      <>
        {this.type === 'game' ? this.renderGameTile() : this.renderPlatformTile()}
      </>
    )
  }

  renderGameTile() {
    return (
      <li className='tile-game'>
        <Link to={`/games/${this.tileInfo.id}`}>
          <h2 className='tile-game-title'>{this.tileInfo.name}</h2>
          {
            this.tileInfo.cover
              ? <img className='tile-game-cover' src={`http:${this.tileInfo.cover.url.replace('thumb', 'cover_small_2x')}`} alt={this.tileInfo.title}/>
              : null
          }
        </Link>
      </li>
    )
  }

  renderPlatformTile() {  }
}
