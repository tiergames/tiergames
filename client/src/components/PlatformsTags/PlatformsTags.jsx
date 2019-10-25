import React, { Component } from "react";
import PlatformTag from './../../components/PlatformTag/PlatformTag'

export default class PlatformsTags extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    let newPlatformsSelected = [...this.props.selectedPlatforms]

    e.target.type === "checkbox" && e.target.checked 
      ? newPlatformsSelected.push(+e.target.value) 
      : newPlatformsSelected.pop()
    
    if (e.target.type === "radio") {
      newPlatformsSelected = [+e.target.value]
    }

    this.props.handlePlatformFilterChange(newPlatformsSelected);
  }
  
  render() {    
    const { selectedPlatforms, platforms, type } = this.props;
    
    return (
      <> 
        {platforms.map(platform => 
          <PlatformTag 
            key={platform.id} 
            type={type}
            platform={platform} 
            onChange={e => this.handleChange(e)}
            checked={selectedPlatforms.includes(platform.id)}
          />
        )}
      </>
    );
  }
}
