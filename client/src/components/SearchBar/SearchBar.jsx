import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasFocus: false
    }
  }
  
  render() {
    return (
      <div className="search">
        <form className="search-bar" onSubmit={(e) => this.handleSearchSubmit(e)}>
          <div className="field search-field">
            <input type="search" autoComplete="off" onChange={(e) => this.props.updateSearchText(e.target.value)} name="search" id="search" placeholder="Search games, reviews, users..." onFocus={() => this.openSearchResults()} />
            {this.state.hasFocus && <span className="close-search-results" onClick={(e) => this.closeSearchResults(e)}>Cancel</span>}
          </div>
        </form>
        {this.state.hasFocus && this.renderSearchResults()}
      </div>
    )
  }

  handleSearchSubmit(e) {
    e.preventDefault()
    this.props.makeSearch()
  }

  renderSearchResults() {
    return (
      <div className="search-results">
        {this.renderGamesResults()}
        {this.renderReviewsResults()}
        {this.renderUsersResults()}
      </div>
    )
  }

  openSearchResults() {
    this.setState({
      ...this.state,
      hasFocus: true
    })
  }

  closeSearchResults(e) {
    this.setState({
      ...this.state,
      hasFocus: false
    })
  }

  renderGamesResults() {
    return (
      <section className="results">
        <h3 className="section-title">Games</h3>
        {
          this.props.games.isSearchingGames
            ? <p>Searching games...</p>
            : this.props.games.gamesResults.length > 0
              ? this.props.games.gamesResults.map((gameResult, idx) => {
                  return <Link key={idx} to={`/games/${gameResult.id}`}><p>{gameResult.name}</p></Link>
                })
              : <p>No games</p>
        }
      </section>
    )
  }

  renderReviewsResults() {
    return (
      <section className="results">
        <h3 className="section-title">Reviews</h3>
        {
          this.props.reviews.isSearchingReviews
            ? <p>Searching reviews...</p>
            : this.props.reviews.reviewsResults.length > 0
              ? this.props.reviews.reviewsResults.map((reviewResult, idx) => {
                return <p>{reviewResult.title}</p>
                })
              : <p>No reviews</p>
        }
      </section>
    )
  }

  renderUsersResults() {
    return (
      <section className="results">
        <h3 className="section-title">Users</h3>
        {
          this.props.users.isSearchingUsers
            ? <p>Searching users...</p>
            : this.props.users.usersResults.length > 0
              ? this.props.users.usersResults.map((userResult, idx) => {
                  return <Link key={idx} to={`/profile/${userResult.username}`}><p>{userResult.username}</p></Link>
                })
              : <p>No users</p>
        }
      </section>
    )
  }
}
