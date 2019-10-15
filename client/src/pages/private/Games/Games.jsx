import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import GameService from './../../../services/games.service'
import GenresService from './../../../services/genres.service'
import PlatformsService from './../../../services/platforms.service'
import PlatformsTags from './../../../components/PlatformsTags/PlatformsTags'

export default class Games extends Component {
  constructor(props) {
    super(props)

    this.gamesService = new GameService()
    this.genresService = new GenresService()
    this.platformsService = new PlatformsService()

    this.state = {
      pagination: {
        limit: 10,
        offset: 0,
        currentPage: 0,
      },
      genres: props.genres,
      platforms: props.platforms,
      games: props.games
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

  componentDidMount() {}

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
        {this.state.genres.isLoadingGenres
          ?
            <p>Loading genres...</p>
          :
            <form className="filter games-filter">
              {this.state.genres.genresFiltered.map(genre => {
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
    // TODO: Ver si lo quitamos (lo que esta comentado)
    // return (
      // <section>
      //   <h2>Platforms</h2>
      //     {this.state.platforms.isLoadingPlatforms
      //       ?
      //         <p>Loading platforms...</p>
      //       :
      //         <form className="filter filter-platforms">
      //           {this.state.platforms.platformsFiltered.map(platform => {
      //             return (
      //               <div className="field field-checkbox" key={platform._id}>
      //                 <input type="checkbox" name="platform" id={platform._id}/>
      //                 <label htmlFor={platform._id} className="checkbox-label">{platform.name}</label>
      //               </div>
      //             )
      //           })}
      //       </form>
      //     }
      // </section>
    // )

    return (
      <section>
        <h2>Platforms</h2>
          {this.state.platforms.isLoadingPlatforms
            ?
              <p>Loading platforms...</p>
            :
            <PlatformsTags platforms={this.state.platforms.platforms} type="checkbox" />
          }
      </section>
    )
  }

  renderGames() {
    return (
      <section>
        <h2>Games</h2>
        <ul className="games-list">
          {this.state.games.games.length > 0
            ? 
              this.state.games.games.map(game => {
                return <li key={game.id}>{game.name}</li>
              })
            : null
          }
        </ul>
        {this.state.games.isLoadingGames
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
