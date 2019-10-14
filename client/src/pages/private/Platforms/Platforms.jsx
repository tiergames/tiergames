import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PlatformsService from './../../../services/platforms.service'

export default class Platform extends Component {
  constructor(props) {
    super(props)
    this.service = new PlatformsService()
    this._isMounted = false
    
    this.state = {
      platforms: props.platforms.platforms,
      platformsFiltered: props.platforms.platforms,
      isLoadingPlatforms: props.platforms.isLoadingPlatforms,
      currentPlatform: props.platforms.currentPlatform
    }
  }

  render() {
    return (
      <div>
        <h1>Platforms</h1>
        <ul className="platforms-list">
        {
          (this.state.platformsFiltered.length > 0)
          ? (
            this.state.platformsFiltered.map(platform => {
              return <li key={platform._id}>{platform.name}</li>
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
    if (this._isMounted) {
      this.setState({
        ...this.state,
        platforms: allPlatforms
      })
    }
  }
}
