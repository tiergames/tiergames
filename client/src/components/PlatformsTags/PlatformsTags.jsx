import React, { Component } from "react";
import PlatformTag from './../../components/PlatformTag/PlatformTag'

export default class PlatformsTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platforms: props.platforms,
      platformsFiltered: [],
      platformSelected: undefined
    };
  }

  handleChange(e) {
    let platformSelected;
    let newPlatforms = [...this.state.platformsFiltered]

    e.target.type === "checkbox" && e.target.checked 
      ? newPlatforms.push(+e.target.value) 
      : newPlatforms.pop()
    
    if (e.target.type === "radio") {
      platformSelected = +e.target.value
    }

    this.setState({
      platformSelected: platformSelected,
      platformsFiltered: newPlatforms
    });
  }

  render() {    
    const { platforms } = this.state;
    const { type } = this.props;
    
    return (
      <div className="platforms padding-v-8">
        <form>
          {platforms.map(platform => 
            <PlatformTag 
              key={platform.id} 
              type={type}
              platform={platform} 
              onChange={e => this.handleChange(e)} />
          )}
        </form>
      </div>
    );
  }
}
