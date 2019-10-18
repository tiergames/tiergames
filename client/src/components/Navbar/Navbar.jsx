import React, { Component } from 'react'
import {Link} from 'react-router-dom'
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
                <li className="main-menu-item"><Link className="main-menu-link" to={"/"}><Home />Home</Link></li>
                <li className="main-menu-item"><Link className="main-menu-link" to={"/games"}><Rocket />Games</Link></li>
                <li className="main-menu-item"><Link className="main-menu-link" to={"/reviews"}><Reviews />Reviews</Link></li>
                <li className="main-menu-item"><Link className="main-menu-link" to={"/saved"}><Saved />Saved</Link></li>
                <li className="main-menu-item"><Link className="main-menu-link" to={"/profile"}><User />Profile</Link></li>
                {/* <li className="main-menu-item"><Link className="main-menu-link" to={"/games/coming-soon"}>Coming Soon</Link></li> */}
                {/* <li className="main-menu-item"><Link className="main-menu-link" to={"/games/best-rated"}>Best rated</Link></li> */}
                {/* <li className="main-menu-item"><Link className="main-menu-link" to={"/games/best-rated"}>Best rated</Link></li> */}
                {/* <li className="main-menu-item"><Link className="main-menu-link" to={"/genres"}>Genres</Link></li> */}
                {/* <li className="main-menu-item"><Link className="main-menu-link" to={"/platforms"}>Platforms</Link></li> */}
                {/* <li className="main-menu-item"><Link className="main-menu-link" to={"/logout"} onClick={this.handleLogout}>Logout</Link></li> */}
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
