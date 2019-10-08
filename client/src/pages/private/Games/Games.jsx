import React, { Component } from 'react'
import axios from 'axios'

export default class Games extends Component {
  render() {
    return (
      <div>
        <h1>Games</h1>
      </div>
    )
  }

  componentDidMount() {
    axios.post(
      "http://localhost:3001/api/games?offset=0&limit=10"
    ). then(games => {
      console.log(games)
    })
  }
}
