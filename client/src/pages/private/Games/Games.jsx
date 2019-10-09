import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Games extends Component {
  constructor(props) {
    super()
    this.state = {
      pagination: {
        limit: 10,
        offset: 0,
        currentPage: 0,
      },
      isLoadingGames: false,
      games: [],
      gamesFiltered: []
    }
  }
  
  render() {
    return (
      <div>
        <h1>Games</h1>
        {this.state.games.length > 0
          ? 
            this.state.games.map(game => {
              return <li key={game.id}>{game.name}</li>
            })
          : null
        }

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

  componentDidMount() {
    axios.get(`http://localhost:3001/api/games?offset=${this.state.pagination.offset}&limit=${this.state.pagination.limit}`)
      .then(allGames => {
        this.setState({
          ...this.state,
          games: allGames.data
        })
      })
  }

  loadNextGames() {
    this.setState({
      ...this.state,
      isLoadingGames: true
    })
    
    let nextPage = this.state.pagination.currentPage + 1
    let nextOffset = this.state.pagination.limit * nextPage

    axios.get(`http://localhost:3001/api/games?offset=${nextOffset}&limit=${this.state.pagination.limit}`)
      .then(nextNewGames => {
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
      })
  }

  renderGames() {

  }
}
