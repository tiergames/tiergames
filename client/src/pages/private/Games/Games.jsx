import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import GameService from './../../../services/games.service'
import GenresService from './../../../services/genres.service'
import PlatformsService from './../../../services/platforms.service'

export default class Games extends Component {
  constructor(props) {
    super()
    this.gamesService = new GameService()
    this.genresService = new GenresService()
    this.platformsService = new PlatformsService()
    this.state = {
      pagination: {
        limit: 10,
        offset: 0,
        currentPage: 0,
      },
      games: [],
      gamesFiltered: [],
      isLoadingGames: true,
      genres: [],
      isLoadingGenres: true,
      platforms: [],
      isLoadingPlatforms: true,
    }
  }
  
  render() {
    return (
      <>
        {this.renderGenres()}
        {this.renderPlatforms()}
        {this.renderGames()}
      </>
    )
  }

  componentDidMount() {
    this.loadGames()
    this.loadPlatforms()
    this.loadGenres()
  }

  async loadGames() {
    let allGames = await this.gamesService.getGames(this.state.pagination.limit, this.state.pagination.offset)
    this.setState({
      ...this.state,
      games: allGames.data,
      isLoadingGames: false
    })
  }

  async loadGenres() {
    let allGenres = await this.genresService.getAllGenres()
    this.setState({
      ...this.state,
      genres: allGenres.data,
      isLoadingGenres: false
    })
  }

  async loadPlatforms() {
    let allPlatforms = await this.platformsService.platforms()
    console.log("PLATFORMS", allPlatforms)
    this.setState({
      ...this.state,
      isLoadingPlatforms: false,
      platforms: allPlatforms
    })
  }

  async loadNextGames() {
    this.setState({
      ...this.state,
      isLoadingGames: true
    })
    
    let nextPage = this.state.pagination.currentPage + 1
    let nextOffset = this.state.pagination.limit * nextPage
    
    let nextNewGames = await this.gamesService.getGames(this.state.pagination.limit, nextOffset)
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

  renderGenres() {
    return (
      <section>
        <h2>Genres</h2>
        {this.state.isLoadingGenres
          ?
            <p>Loading genres...</p>
          :
            <form className="filter games-filter">
              {this.state.genres.map(genre => {
                return (
                  <div className="field field-checkbox" key={genre.id}>
                    <input type="checkbox" name="genre" id={genre.id}/>
                    <label htmlFor={genre.id} className="checkbox-label">{genre.name}</label>
                  </div>
                )
              })}
              <div className="form-actions">
                <button type="submit">Apply filter</button>
              </div>
            </form>
        }
      </section>
    )
  }

  renderPlatforms() {
    return (
      <section>
        <h2>Platforms</h2>
          {this.state.isLoadingPlatforms
            ?
              <p>Loading platforms...</p>
            :
              <form className="filter filter-platforms">
                {this.state.platforms.map(platform => {
                  return (
                    <div className="field field-checkbox" key={platform.id}>
                      <input type="checkbox" name="platform" id={platform.id}/>
                      <label htmlFor={platform.id} className="checkbox-label">{platform.name}</label>
                    </div>
                  )
                })}
            </form>
          }
      </section>
    )
  }

  renderGames() {
    return (
      <section>
        <h2>Games</h2>
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
      </section>
    )
  }
}
