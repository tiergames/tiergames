import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import AuthService from './services/auth.service'

// Pages
import Home from './pages/Public/Home/Home'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import Error404 from './pages/errors/Error404/Error404'
import Profile from './pages/private/Profile/Profile'

// Components
import Navbar from './components/Navbar/Navbar'

// Styles
import "./scss/main.scss"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService()
    this.state = {
      loggedInUser: null
    }
    this.fetchUser()
  }
  
  render() {
    return (
      <div>
        <Switch>
        </Switch>
        <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
        <Switch>
          <Route exact path="/" component={Home} />
          {this.state.loggedInUser
            ?
            <>
                <Route exact path="/profile" component={() => <Profile loggedInUser={this.state.loggedInUser} />} />
              </>
            :
            <>
                <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
                <Route exact path="/signup" component={() => <Signup setUser={this.setUser} />} />
              </>
          }
          <Route exact component={Error404} />
        </Switch>
      </div>
    )
  }

  fetchUser () {
    return this.authService.loggedin()
      .then(response => {
        this.setState({
          ...this.state,
          loggedInUser: response
        })
      })
      .catch(error => {
        this.setState({
          ...this.state,
          loggedInUser: false
        })
      })
  }

  setUser = (userObj) => {
    this.setState({
      ...this.state,
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.authService.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };
}
