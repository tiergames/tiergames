import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import GenresService from './../../../services/genres.service'

export default class Genres extends Component {
  constructor() {
    super()
    this.service = new GenresService()
    this.state = {
      isLoadingGenres: true,
      genres: []
    }
  }
  
  render() {
    return (
      <section className="genres-section">
        <h1>Genres</h1>
        <ul className="genres-list">
          {this.state.genres.length > 0
            ?
              this.state.genres.map(genre => {
                return <li key={genre.id}>{genre.name}</li>
              })
            : null
          }

          {this.state.isLoadingGenres
            ?
              <p to={"#"}>Loading...</p>
            : null
          }
        </ul>
      </section>
    )
  }

  async componentDidMount() {
    let allGenres = await this.service.getAllGenres()
    this.setState({
      ...this.state,
      genres: allGenres.data,
      isLoadingGenres: false
    })
  }
}
