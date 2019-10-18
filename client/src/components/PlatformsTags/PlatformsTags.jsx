import React, { Component } from "react";
import PlatformTag from './../../components/PlatformTag/PlatformTag'

export default class PlatformsTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platforms: props.platforms,
      platformsSelected: props.selectedPlatforms || []
    };
  }

  handleChange(e) {
    let newPlatformsSelected = [...this.state.platformsSelected]

    e.target.type === "checkbox" && e.target.checked 
      ? newPlatformsSelected.push(+e.target.value) 
      : newPlatformsSelected.pop()
    
    if (e.target.type === "radio") {
      newPlatformsSelected = [+e.target.value]
    }

    this.setState({
      platformsSelected: newPlatformsSelected,
    });

    this.props.handlePlatformFilterChange(newPlatformsSelected);
  }
  
  render() {    
    const { platforms, platformsSelected } = this.state;
    const { type } = this.props;
    
    return (
      <> 
        {platforms.map(platform => 
          <PlatformTag 
            key={platform.id} 
            type={type}
            platform={platform} 
            onChange={e => this.handleChange(e)}
            checked={platformsSelected.includes(platform.id)}
          />
        )}
      </>
    );
  }
}
