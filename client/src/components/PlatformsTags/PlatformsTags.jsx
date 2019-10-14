import React, { Component } from "react";

export default class PlatformsTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isChecked: "",
      platforms: props.platforms
    };
  }

  handleChange(e) {
    const { name } = e.target;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("the state is", this.state);

    {console.log("PLATFORMS FROM PLATTAGSS", this.state)}

    return (
      <div className="platforms padding-v-8">
        <form>
          <ul className="platforms-list">
            {this.state.platforms.map(platform => {
              return <li key={platform._id}>{platform.name}</li>;
            })}
          </ul>

          {/* <div className="field">
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
            </div> */}

          {this.props.children}
        </form>
      </div>
    );
  }
}
