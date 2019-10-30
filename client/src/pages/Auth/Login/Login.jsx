import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { ReactComponent as DirectionRight } from './../../../assets/icons/direction-right.svg'
import { ReactComponent as Facebook } from './../../../assets/icons/social/facebook.svg'
import { ReactComponent as Google } from './../../../assets/icons/social/google.svg'
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
      <>
      <div className="logo">
        <svg viewBox="0 0 152 32">
          <g fill="none" fillRule="evenodd">
          <path fill="#FFF" d="M32.0004-.0004v8h2.666v-5.333h8v26.667h-6.666v2.666h16v-2.666h-6.666V2.6666h7.999v5.333h2.666v-8zM63.9999-.0004v2.667h10.667v26.667h-10.667v2.666h24v-2.666h-10.667V2.6666h10.667v-2.667zM111.9996-.0004v2.667h5.334v10.666h-13.333v2.667h13.333v13.334h-21.333v2.666h23.999v-32z"></path>
          <path fill="#00FF68" d="M0-.0004v32h24v-32H0zm16 2.667h5.334v10.666H16V2.6666zM2.667 7.9996v-5.333h10.666v10.666H2.667v-5.333zm5.333 8h13.334v13.334L8.002 16.0016l-3.773-.002H8zm-5.333 0h1.562l13.333 13.334H2.667v-13.334z"></path>
          <path fill="#FFF" d="M127.9998-.0004v32h2.667v-16h1.658l15.904 16h3.771l-16-16h8v-16h-16zm2.667 8v-5.333h10.666v10.666h-10.666v-5.333z"></path>
          </g>
        </svg>
      </div>
      
      <section className="home">
        <div className="account-question">
          <p>Don't you have an account? <Link to={"/signup"}>Join us</Link></p>
        </div>

        <div className="social-login">
          <a href={`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/facebook`}>
            <Facebook />
          </a>
          
          <a href={`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/google`}>
            <Google />
          </a>
        </div>

        <form onSubmit={e => this.handleFormSubmit(e)} className="home-form">
          <div className="field">
            <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} id="login-username" className="input"/>
            {/* <label htmlFor="login-username" className="label">Username</label> */}
          </div>
          <div className="field">
            <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} id="login-password" className="input"/>
            {/* <label htmlFor="login-password" className="label">Password</label> */}
          </div>
          <div className="form-actions">
            {/* <input type="submit" value="Login to your account" /> */}
            <button type="submit">
              <DirectionRight />
              Login to your account
            </button>
          </div>
        </form>

        <h4>{this.state.error ? 'Error' : ''}</h4>
      </section>
      </>
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
