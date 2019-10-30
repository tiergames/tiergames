import React, { Component } from 'react'

export default class Genres extends Component {
  
  render() {
    return (
      <section className="genres-section">
        <h1>Genres</h1>
        <ul className="genres-list">
          {this.props.genres.genres.length > 0
            ?
              this.props.genres.genres.map(genre => {
                return <li key={genre.id}>{genre.name}</li>
              })
            : null
          }
          {this.props.genres.isLoadingGenres
            ?
              <p to={"#"}>Loading...</p>
            : null
          }
        </ul>
      </section>
    )
  } 
}
