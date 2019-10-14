import React, { Component } from 'react'
import PlatformsService from '../../services/platforms.service'

export default class PlatformTag extends Component {
  constructor(props) {
    super(props)
    this.service = new PlatformsService()
    
    this.state = {
      platforms: props.platforms.platforms
    }
  }  
  
  render() {
    return (
      <>
        <div className="field">
              <input
                type={this.props.type}
                name="xbox"
                className="input"
                onChange={e => this.handleChange(e)}
              />
              <label htmlFor="xbox">Xbox</label>
            </div>

            <div className="field">
              <input
                type="checkbox"
                name="ps4"
                className="input"
                onChange={e => this.handleChange(e)}
              />
              <label htmlFor="ps4">Ps4</label>
            </div>
      </>
    )
  }

  async componentDidMount() {
    const allPlatforms = await this.service.platforms()

    this.setState({
      ...this.state,
      platforms: allPlatforms
    })
  }
}
