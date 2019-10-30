import React, { Component } from 'react'

export default class Platform extends Component {

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
