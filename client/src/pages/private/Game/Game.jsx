import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import GamesService from './../../../services/games.service'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.gamesService = new GamesService()
    this.gameID = props.match.params.gameID
    this.state = {
      game: {},
      isLoadingGame: true
    }
  }
  
  render() {
    return (
      <section className="game">
        {
          this.state.isLoadingGame
            ? <p>Loading game info...</p>
            : this.renderGame()
        }
      </section>
    )
  }

  componentDidMount() {
    this.loadGame(this.gameID)
  }

  renderTemplate() {

  }

  renderGame() {
    return (
      <>
        {this.renderHeader()}
        {this.renderIAmFollowing()}
        {this.renderSummary()}
        {this.renderStoryLine()}
        {this.renderGameModes()}
        {this.renderGameGenres()}
        {this.renderScreenshots()}
        {this.renderVideos()}
        {this.renderReleaseDates()}
        {this.renderWebsites()}
        {this.renderSimilarGames()}
      </>
    )
  }

  renderHeader() {
    return (
      <header className="game-header">
        <div className="game-header-image">
          <img src={`http:${this.state.game.cover.url}`} alt={this.state.game.name}/>
        </div>
        <div className="game-header-info">
          <h2 className="game-title">{this.state.game.name}</h2>
          <div className="game-platforms">
            {this.renderPlatforms()}
          </div>
        </div>
      </header>
    )
  }

  renderIAmFollowing() {
    return (
      <div className="game-i-am-following">
        <span className="game-i-am-following-status">Following</span>
        <span className="game-i-am-following-rating">{(this.state.game.total_rating / 10).toFixed(1)}</span>
      </div>
    )
  }

  renderSummary() {
    return (
      <section className="game-section">
        <h3>Summary</h3>
        <div className="game-section-content">
          <p>{this.state.game.summary}</p>
        </div>
      </section>
    )
  }

  renderStoryLine() {
    return (
      <section className="game-section">
        <h3>Story line</h3>
        <p>{this.state.game.storyline}</p>
      </section>
    )
  }

  renderPlatforms() {
    return (
      this.state.game.platforms.map(platform => {
        return <Link to={`/games?platform=${platform.id}`} key={platform.id} className="tag">{platform.name}</Link>
      })
    )
  }

  renderGameModes() {
    return (
      <section className="game-section">
          <h3>Modes</h3>
          <div className="game-section-content">
            <ul>
              {this.state.game.game_modes.map(gameMode => {
                return <li key={gameMode.id}>{gameMode.name}</li>
              })}
            </ul>
          </div>
        </section>
    )
  }

  renderGameGenres() {
    return (
      <section className="game-section">
          <h3>Genres</h3>
          <div className="game-section-content">
            <ul>
              {this.state.game.genres.map(genre => {
                return (
                  <li key={genre.id}>
                    <Link to={`/games?genres=${genre}`}>{genre.name}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
    )
  }

  renderInvolvedCompanies() {
    return (
      <ul>
        {this.state.game.involved_companies.map(company => {
          return (
            <li key={company.id}>{company.name}</li>
          )
        })}
      </ul>
    )
  }
  
  renderScreenshots() {
    return (
      <section className="game-section">
          <h3>Screenshots</h3>
          <div className="game-section-content">
            <ul>
              {this.state.game.screenshots.map(screenshot => {
                return (
                  <li key={screenshot.id}>
                    <img src={`http:${screenshot.url.replace('t_thumb', 't_screenshot_big')}`} alt={`${this.state.game.name} screenshot`}/>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
    )
  }

  renderVideos() {
    return (
      <section className="game-section">
        <h3>Videos</h3>
        <div className="game-section-content">
          <ul>
            {this.state.game.videos.map(video => {
              return (
                <li key={video.id}>
                  <iframe
                    width="560" height="315"
                    src={`https://www.youtube.com/embed/${video.video_id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                  <p>{video.name}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }

  renderReleaseDates() {
    return (
      <section className="game-section">
        <h3>Release dates</h3>
        <section className="game-subsection">
          <h4>First release date</h4>
          <p>
            <Moment format='MMMM Do YYYY'>{new Date(this.state.game.first_release_date * 1000)}</Moment>
          </p>
        </section>
        <section className="game-subsection">
          <h4>Other release dates</h4>
          {this.state.game.release_dates.map(releaseDate => {
            return (
              <li key={releaseDate.id}>
                <Moment format='MMMM Do YYYY'>{new Date(new Date(releaseDate.date * 1000))}</Moment>
              </li>
            )
          })}
        </section>
      </section>
    )
  }

  renderWebsites() {
    return (
      <section className="game-section">
        <h3>Websites</h3>
        <div className="game-section-content">
          <ul>
            {this.state.game.websites.map(website => {
              return (
                <li key={website.id}><a href={`${website.url}`} target="_blank">{website.url}</a></li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }

  renderSimilarGames() {
    return (
      <section className="game-section">
        <h3>Similar games</h3>
        <div className="game-section-content">
          {this.state.game.similar_games.map(similarGame => {
            return (
              <li key={similarGame.id}>
                <img src={`http:${similarGame.cover.url.replace('t_thumb', 't_cover_small_2x')}`} alt={`${similarGame.name}`}/>
                <p>{similarGame.name}</p>
              </li>
            )
          })}
        </div>
      </section>
    )
  }

  async loadGame() {
    let game = await this.gamesService.getGameData(this.gameID)
    this.setState({ isLoadingGame: false, game: game[0] })
  }

  async loadRelatedGames() {
    
  }
}
