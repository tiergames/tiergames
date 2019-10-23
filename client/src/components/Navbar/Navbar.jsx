import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import AuthService from './../../services/auth.service'

import { ReactComponent as Rocket } from './../../assets/icons/rocket.svg'
import { ReactComponent as Home } from './../../assets/icons/home.svg'
import { ReactComponent as Reviews } from './../../assets/icons/star.svg'
import { ReactComponent as Saved } from './../../assets/icons/saved.svg'
import { ReactComponent as User } from './../../assets/icons/user.svg'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {loggedInUser : null}
    this.authService = new AuthService();
  }
  
  render() {
    return (
      <nav className="navbar">
        <ul className="main-menu">
          {!this.state.loggedInUser
            ? 
            <>
                
              </>
            :
            <>
                <li className="main-menu-item"><NavLink exact activeClassName="main-menu-link-active" className="main-menu-link" to={"/"}><Home />Home</NavLink></li>
                <li className="main-menu-item"><NavLink exact activeClassName="main-menu-link-active" className="main-menu-link" to={"/games"}><Rocket />Games</NavLink></li>
                <li className="main-menu-item"><NavLink exact activeClassName="main-menu-link-active" className="main-menu-link" to={"/reviews"}><Reviews />Reviews</NavLink></li>
                <li className="main-menu-item"><NavLink exact activeClassName="main-menu-link-active" className="main-menu-link" to={"/saved"}><Saved />Saved</NavLink></li>
                <li className="main-menu-item"><NavLink exact activeClassName="main-menu-link-active" className="main-menu-link" to={"/profile"}><User />Profile</NavLink></li>
                {/* <li className="main-menu-item"><NavLink className="main-menu-link" to={"/games/coming-soon"}>Coming Soon</NavLink></li> */}
                {/* <li className="main-menu-item"><NavLink className="main-menu-link" to={"/games/best-rated"}>Best rated</NavLink></li> */}
                {/* <li className="main-menu-item"><NavLink className="main-menu-link" to={"/games/best-rated"}>Best rated</NavLink></li> */}
                {/* <li className="main-menu-item"><NavLink className="main-menu-link" to={"/genres"}>Genres</NavLink></li> */}
                {/* <li className="main-menu-item"><NavLink className="main-menu-link" to={"/platforms"}>Platforms</NavLink></li> */}
                {/* <li className="main-menu-item"><NavLink className="main-menu-link" to={"/logout"} onClick={this.handleLogout}>Logout</></li> */}
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
