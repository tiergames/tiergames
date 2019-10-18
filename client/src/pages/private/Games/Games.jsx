import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import GameService from './../../../services/games.service'
import GenresService from './../../../services/genres.service'
import PlatformsService from './../../../services/platforms.service'
import PlatformsTags from './../../../components/PlatformsTags/PlatformsTags'
import GenresTags from './../../../components/GenresTags/GenresTags'
import Platform from '../Platforms/Platforms'
import queryString from 'query-string'

export default class Games extends Component {
  constructor(props) {
    super(props)

    this.gamesService = new GameService()
    this.genresService = new GenresService()
    this.platformsService = new PlatformsService()

    this.queryParams = queryString.parse(window.location.search)

    this.state = {
      pagination: {
        limit: 10,
        offset: 0,
        currentPage: 0,
      },
      games: props.games
    }
  }
  
  render() {
    return (
      <>
        {this.renderFilters()}
        {this.renderGames()}
      </>
    )
  }

  componentDidMount() {}

  async loadNextGames() {
    this.setState({
      isLoadingGames: true
    })
    
    let nextPage = this.state.pagination.currentPage + 1
    let nextOffset = this.state.pagination.limit * nextPage
    
    let nextNewGames = await this.gamesService.getGames(this.state.pagination.limit, nextOffset)
    let newGames = [...this.state.games]
    let newPagination = {...this.state.pagination}
    newPagination.offset = nextOffset
    newPagination.currentPage = nextPage
    newGames.push(...nextNewGames.data);

    this.setState({
      pagination: newPagination,
      games: newGames,
      isLoadingGames: false
    })
  }

  renderFilters() {    
    return (
      <section>
        <form className="form games-form" onSubmit={e => this.handleFormSubmit(e)}>

          <section className="form-section">
            <h2 className="section-title">Genres</h2>
            <div className="form-section-content form-section-content-tags">
              {this.props.genres.isLoadingGenres
                ?
                  <p>Loading genres...</p>
                :
                <GenresTags 
                  handleGenreFilterChange={this.handleGenreFilterChange}
                  selectedGenres={this.props.genres.currentGenre}
                  genres={this.props.genres.genres} 
                  type="checkbox" 
                />
              }
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">Platforms</h2>
            <div className="form-section-content form-section-content-tags">
              {this.props.platforms.isLoadingPlatforms
                ?
                  <p>Loading platforms...</p>
                :
                <PlatformsTags 
                  handlePlatformFilterChange={this.handlePlatformFilterChange} 
                  platforms={this.props.platforms.platforms}
                  selectedPlatforms={this.props.platforms.currentPlatform}
                  type="checkbox" 
                />
              }
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="button">Apply filter</button>
          </div>
        </form>
      </section>
    )
  }
  
  handleGenreFilterChange = (genresSelected) => {
    this.props.onGenreFilterChange(genresSelected)
  }
  
  handlePlatformFilterChange = (platformFilter) => {
    this.props.onPlatformFilterChange(platformFilter)
  }

  handleFormSubmit(e) {
    e.preventDefault()
  
    this.props.onFilterApply();
  }
  
  renderGames() {
    return (
      <section className="games-results">
        <h2 className="section-title">Games</h2>
        <ul className="games-list">
          {this.state.games.games.length > 0
            ? 
            this.state.games.games.map(game => {
              return <li key={game.id}><Link to={`/games/${game.id}`}>{game.name}</Link></li>
                
              })
            : null
          }
        </ul>
        {/* {this.state.games.isLoadingGames
          ?
          <Link className="button" to={"#"}>
              Loading...
            </Link>
          :
          <Link className="button" to={"#"} onClick={() => this.loadNextGames()}>
              Load more
            </Link>
        } */}
      </section>
    )
  }
}
