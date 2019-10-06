import React, { Component } from 'react'

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = props.state
  }
  
  render() {
    return (
      <form className="form" onSubmit={e => this.handleSubmit(e)}>
        {this.props.children}
      </form>
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendFormData(this.state)
  }
}
