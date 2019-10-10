import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PlatformsService from './../../../services/platforms.service'

export default class Platform extends Component {
  constructor() {
    super()
    this.service = new PlatformsService()
    
    this.state = {
      platforms: []
    }
  }

  render() {
    return (
      <div>
        <h1>Platforms</h1>
        <ul className="platforms-list">
        {
          (this.state.platforms.length > 0)
          ? (
            this.state.platforms.map(platform => {
              return <li key={platform.id}>{platform.name}</li>
            })
          )
          : null
        }
        </ul>
      </div>
    )
  }

  async componentDidMount() {
    let allPlatforms = await this.service.platforms()
    this.setState({
      ...this.state,
      platforms: allPlatforms
    })
  }
}
