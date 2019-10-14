import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from './../../../services/auth.service'
import {withRouter} from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService()
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <section className="login">
        <h2>Login</h2>
        <div className="account-question">
          <p>Don't you have an account? <Link to={"/signup"}>Join us</Link></p>

          {/* TODO: Check routes */}
          <a href={`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/facebook`}>Login with Facebook</a>
          <a href={`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/google`}>Login With Google</a>

        </div>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <div className="field">
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} id="login-username" className="input"/>
            <label htmlFor="login-username" className="label">Username</label>
          </div>
          <div className="field">
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} id="login-password" className="input"/>
            <label htmlFor="login-password" className="label">Password</label>
          </div>
          <div className="form-actions">
            <input type="submit" value="Login"/>
          </div>
        </form>

        <h4>{this.state.error ? 'Error' : ''}</h4>
      </section>
    )
  }

  handleChange(e) {
    const newState = {...this.state}
    newState[e.target.name] = e.target.type === "number" ? +e.target.value : e.target.value
    this.setState(newState)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    const {username, password} = this.state
    this.service.login(username, password)
      .then(response => {
        this.setState({
          ...this.state,
          username: "",
          password: "",
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
          error: true
        })
      })
  }
}

export default withRouter(Login)
