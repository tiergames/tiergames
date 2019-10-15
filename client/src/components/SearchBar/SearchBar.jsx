import React, { Component } from 'react'

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
            {this.state.hasFocus && <span onClick={(e) => this.closeSearchResults(e)}>Cancel</span>}
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
        <h2>Results</h2>
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
        <h3>Games</h3>
        {
          this.props.gamesResults.length > 0
            ?
              this.props.gamesResults.map((gameResult, idx) => {
                return <p key={idx}>{gameResult.name}</p>
              })
            : <p>No reviews found</p>
        }
      </section>
    )
  }

  renderReviewsResults() {
    return (
      <section className="results">
        <h3>Reviews</h3>
        {
          this.props.reviewsResults.length > 0
            ?
              this.props.reviewsResults.map((reviewResult, idx) => {
                return <p key={idx}>{reviewResult.title}</p>
              })
            : <p>No games found</p>
        }
      </section>
    )
  }

  renderUsersResults() {
    return (
      <section className="results">
        <h3>Users</h3>
        {
          this.props.usersResults.length > 0
            ?
              this.props.usersResults.map((userResult, idx) => {
                return <p key={idx}>{userResult.username}</p>
              })
            : <p>No users found</p>
        }
      </section>
    )
  }
}
