import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import GameService from './../../../services/games.service'

export default class Games extends Component {
  constructor(props) {
    super()
    this.service = new GameService()
    this.state = {
      pagination: {
        limit: 10,
        offset: 0,
        currentPage: 0,
      },
      isLoadingGames: true,
      games: [],
      gamesFiltered: []
    }
  }
  
  render() {
    return (
      <div>
        <h1>Games</h1>
        <ul className="games-list">
          {this.state.games.length > 0
            ? 
              this.state.games.map(game => {
                return <li key={game.id}>{game.name}</li>
              })
            : null
          }
        </ul>

        {this.state.isLoadingGames
          ?
            <Link to={"#"}>
              Loading...
            </Link>
          :
            <Link to={"#"} onClick={() => this.loadNextGames()}>
              Load more
            </Link>
        }
      </div>
    )
  }

  async componentDidMount() {
    let allGames = await this.service.getGames(this.state.pagination.limit, this.state.pagination.offset)
    this.setState({
      ...this.state,
      games: allGames.data,
      isLoadingGames: false
    })
  }

  async loadNextGames() {
    this.setState({
      ...this.state,
      isLoadingGames: true
    })
    
    let nextPage = this.state.pagination.currentPage + 1
    let nextOffset = this.state.pagination.limit * nextPage
    
    let nextNewGames = await this.service.getGames(this.state.pagination.limit, nextOffset)
    let newGames = [...this.state.games]
    let newPagination = {...this.state.pagination}
    newPagination.offset = nextOffset
    newPagination.currentPage = nextPage
    newGames.push(...nextNewGames.data)
    this.setState({
      ...this.state,
      pagination: newPagination,
      games: newGames,
      isLoadingGames: false
    })
  }

  renderGames() {

  }
}
