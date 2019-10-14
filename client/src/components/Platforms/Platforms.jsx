import React, { Component } from 'react'

export default class Platforms extends Component {
  constructor() {
    super()

    this.state = {
      // isChecked: "",
      platforms: []
    }
  }

  handleChange(e) {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    // const selectedPlatform = this.state.isChecked === "checked" ? "" : "checked"
      
    this.setState({
      [name]: value,
      // isChecked: selectedPlatform
    });
  }

  render() {

    console.log("the state is", this.state)

    return (
      <div className="platforms padding-v-8">
          <form>
            <div className="field">
              <input
                type="checkbox"
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
          </form>
        </div>
    )
  }
}
