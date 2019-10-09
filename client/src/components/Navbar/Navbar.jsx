import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from './../../services/auth.service'
import "./Navbar.scss"

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {loggedInUser : null}
    this.authService = new AuthService();
  }
  
  render() {
    return (
      <nav className="navbar">
        <ul className="menu">
          <li className="menu-item"><Link className="menu-link" to={"/"}>Home</Link></li>
          {!this.state.loggedInUser
            ? 
              <>
                <li className="menu-item"><Link className="menu-link" to={"/login"}>Login</Link></li>
                <li className="menu-item"><Link className="menu-link" to={"/signup"}>Signup</Link></li>
              </>
            :
              <>
                <li className="menu-item"><Link className="menu-link" to={"/games"}>Games</Link></li>
                <li className="menu-item"><Link className="menu-link" to={"/genres"}>Genres</Link></li>
                <li className="menu-item"><Link className="menu-link" to={"/profile"}>Profile</Link></li>
                <li className="menu-item"><Link className="menu-link" to={"/logout"} onClick={this.handleLogout}>Logout</Link></li>
              </>
          }
        </ul>
      </nav>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = (e) => {
    this.props.logout()
  }
}
