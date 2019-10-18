import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from './../../../services/auth.service'
import {withRouter} from 'react-router'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  
  render() {
    return (
      <section className="home-form">
        <h2>Signup</h2>
        <div className="account-question">
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <div className="field">
            <input type="text" name="username" id="username" onChange={e => this.handleChange(e)} className="input"/>
            <label htmlFor="username" className="label">Username</label>
          </div>
          <div className="field">
            <input type="email" name="email" id="email" onChange={e => this.handleChange(e)} className="input"/>
            <label htmlFor="email" className="label">Email</label>
          </div>
          <div className="field">
            <input type="password" name="password" id="password" onChange={e => this.handleChange(e)} className="input"/>
            <label htmlFor="password" className="label">Password</label>
          </div>
          <div className="form-actions">
            <input type="submit" value="Singup"/>
          </div>
        </form>
        
        <h4>{this.state.error ? 'Error' : ''}</h4>
      </section>
    )
  }

  handleChange = (e) => {
    const newState = {...this.state}
    newState[e.target.name] = e.target.type === "number" ? +e.target.value : e.target.value
    this.setState(newState)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const {username, password, email} = this.state
    this.service.signup(username, email, password)
      .then(response => {
        this.setState({
          ...this.state,
          username: "",
          password: "",
          email: "",
          error: false
        })
        this.props.setUser(response)
        this.props.history.push("/")
      })
      .catch(error => {
        this.setState({
          ...this.state,
          username: username,
          password: "",
          email: "",
          error: true
        })
      })
  }
}

export default withRouter(Signup)