import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Platform extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <div>
        <h1>Platforms</h1>
        <ul className="platforms-list">
        {
          (this.props.platforms.platforms.length > 0)
          ? (
            this.props.platforms.platforms.map(platform => {
              return <li key={platform._id}>{platform.name}</li>
            })
          )
          : null
        }
        </ul>
      </div>
    )
  }
}
