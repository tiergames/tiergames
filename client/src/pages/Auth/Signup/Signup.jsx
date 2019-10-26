import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { ReactComponent as DirectionRight } from './../../../assets/icons/direction-right.svg'
import { ReactComponent as Facebook } from './../../../assets/icons/social/facebook.svg'
import { ReactComponent as Google } from './../../../assets/icons/social/google.svg'
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
      <>
      <div className="logo">
        <svg viewBox="0 0 152 32">
          <g fill="none" fill-rule="evenodd">
          <path fill="#FFF" d="M32.0004-.0004v8h2.666v-5.333h8v26.667h-6.666v2.666h16v-2.666h-6.666V2.6666h7.999v5.333h2.666v-8zM63.9999-.0004v2.667h10.667v26.667h-10.667v2.666h24v-2.666h-10.667V2.6666h10.667v-2.667zM111.9996-.0004v2.667h5.334v10.666h-13.333v2.667h13.333v13.334h-21.333v2.666h23.999v-32z"></path>
          <path fill="#00FF68" d="M0-.0004v32h24v-32H0zm16 2.667h5.334v10.666H16V2.6666zM2.667 7.9996v-5.333h10.666v10.666H2.667v-5.333zm5.333 8h13.334v13.334L8.002 16.0016l-3.773-.002H8zm-5.333 0h1.562l13.333 13.334H2.667v-13.334z"></path>
          <path fill="#FFF" d="M127.9998-.0004v32h2.667v-16h1.658l15.904 16h3.771l-16-16h8v-16h-16zm2.667 8v-5.333h10.666v10.666h-10.666v-5.333z"></path>
          </g>
        </svg>
      </div>

      <section className="home">
        <div className="account-question">
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
  
        <div className="social-login">
          <a href={`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/facebook`}>
            <Facebook />
          </a>
          
          <a href={`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/google`}>
            <Google />
          </a>
        </div>

        <form className="home-form" onSubmit={e => this.handleFormSubmit(e)}>
          <div className="field">
            <input placeholder="Username" type="text" name="username" id="username" onChange={e => this.handleChange(e)} className="input"/>
            {/* <label htmlFor="username" className="label">Username</label> */}
          </div>
          <div className="field">
            <input placeholder="Email" type="email" name="email" id="email" onChange={e => this.handleChange(e)} className="input"/>
            {/* <label htmlFor="email" className="label">Email</label> */}
          </div>
          <div className="field">
            <input placeholder="Password" type="password" name="password" id="password" onChange={e => this.handleChange(e)} className="input"/>
            {/* <label htmlFor="password" className="label">Password</label> */}
          </div>
          <div className="form-actions">
            {/* <input type="submit" value="Create your account"/> */}
            <button type="submit">
              <DirectionRight />
              Create your account
            </button>
          </div>
        </form>
        
        <h4>{this.state.error ? 'Error' : ''}</h4>
      </section>
      </>
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