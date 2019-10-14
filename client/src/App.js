import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {Link} from 'react-router-dom'
import AuthService from "./services/auth.service";

// Pages
import Home from "./pages/Public/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import AccountConfirm from "./pages/Auth/AccountConfirm/AccountConfirm"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Error404 from "./pages/errors/Error404/Error404";
import Profile from "./pages/private/Profile/Profile";
import Games from "./pages/private/Games/Games";
import Genres from "./pages/private/Genres/Genres";
import Platforms from "./pages/private/Platforms/Platforms";

// Components
import Navbar from "./components/Navbar/Navbar";
import BestRated from "./pages/private/BestRated/BestRated";
import ComingSoon from "./pages/private/ComingSoon/ComingSoon";
import Reviews from "./pages/private/Reviews/Reviews";

// Services
import ReviewsService from "./services/reviews.service";
import PlatformsService from "./services/platforms.service";
import GenresService from "./services/genres.service";
import GamesService from "./services/games.service";


// Styles
// import "./scss/main.scss"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
    this.reviewsService = new ReviewsService()
    this.platformsService = new PlatformsService()
    this.genresService = new GenresService()
    this.gamesService = new GamesService()

    this.state = {
      loggedInUser: null,
      platforms: {
        isLoadingPlatforms: true,
        platforms: [],
        platformsFiltered: [],
        currentPlatform: null
      },
      genres: {
        isLoadingGenres: true,
        genres: [],
        genresFiltered: [],
        currentGenre: null
      },
      games: {
        isLoadingGames: true,
        games: [],
        gamesFiltered: [],
        currentGame: null
      },
      reviews: {
        isLoadingReviews: true,
        reviews: [],
        reviewsFiltered: [],
        currentReviewFilter: null,
        pagination: {
          currentPage: 0,
          offset: 0,
          limit: 1
        }
      }
    };
    this.fetchUser();
  }

  render() {
    return (
      <div>
        <Switch></Switch>
        <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
        <Switch>
          <Route exact path="/" component={Home} />
          {this.state.loggedInUser ? (
            <>
              <Route
                exact
                path="/games"
                component={() => (
                  <Games genres={this.state.genres} platforms={this.state.platforms} games={this.state.games} loggedInUser={this.state.loggedInUser} />
                )}
              />
              <Route
                exact
                path="/profile"
                component={() => (
                  <Profile loggedInUser={this.state.loggedInUser} />
                )}
              />
              <Route exact path="/genres" component={() => <Genres genres={this.state.genres} loggedInUser={this.state.loggedInUser} />} />
              <Route exact path="/games/best-rated" component={() => <BestRated loggedInUser={this.state.loggedInUser} />} />
              <Route
                exact
                path="/games/coming-soon"
                component={() => (
                  <ComingSoon loggedInUser={this.state.loggedInUser} />
                )}
              />
              <Route exact path="/reviews" component={() => <Reviews reviews={this.state.reviews} handleLoadMore={() => this.loadReviews()} platforms={this.state.platforms} loggedInUser={this.state.loggedInUser} />} />
              <Route exact path="/platforms" component={() => <Platforms platforms={this.state.platforms} loggedInUser={this.state.loggedInUser} />} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/login"
                component={() => <Login setUser={this.setUser} />}
              />
              <Route
                exact
                path="/signup"
                component={() => <Signup setUser={this.setUser} />}
              />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPassword}
              />
              <Route
                exact
                path="/reset-password/:resetPasswordToken"
                component={ResetPassword}
              />
              <Route
                exact
                path="/update-password/:resetPasswordToken"
                component={ResetPassword}
              />
              <Route
                exact
                path="/confirm/:confirmationToken"
                component={AccountConfirm}
              />
            </>
          )}
          <Route exact component={Error404} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.loadPlatforms()
    this.loadGenres()
    this.loadReviews()
    this.loadGames()
  }

  async loadPlatforms() {
    let platforms = await this.platformsService.platforms()
    let newPlatforms = {...this.state.platforms}
    newPlatforms.isLoadingPlatforms = false
    newPlatforms.platforms = platforms
    newPlatforms.platformsFiltered = platforms
    console.log("Platforms loaded", newPlatforms)
    this.setState({
      ...this.state,
      platforms: newPlatforms
    })
  }

  async loadGenres() {
    let genres = await this.genresService.getAllGenres()
    let newGenres = {...this.state.genres}
    newGenres.isLoadingGenres = false
    newGenres.genres = genres.data
    newGenres.genresFiltered = genres.data
    this.setState({
      ...this.state,
      genres: newGenres
    })
  }

  async loadReviews() {
    let reviews = await this.reviewsService.getReviews(this.state.reviews.pagination.offset, this.state.reviews.pagination.limit)
    let newReviews = {...this.state.reviews}
    newReviews.isLoadingReviews = false
    newReviews.reviews = newReviews.reviews.concat(reviews)
    newReviews.reviewsFiltered = newReviews.reviewsFiltered.concat(reviews)
    newReviews.pagination.currentPage += 1
    newReviews.pagination.offset = newReviews.pagination.limit * this.state.reviews.pagination.currentPage
    this.setState({
      ...this.state,
      reviews: newReviews
    })
  }

  async loadGames() {
    const games = await this.gamesService.getGames(10, 0)

    let newGames = {...this.state}
    newGames.isLoadingGames = false
    newGames.games = games.data
    newGames.gamesFiltered = games.data

    this.setState({
      ...this.state,
      games: newGames
    })
  }

  fetchUser() {
    return this.authService
      .loggedin()
      .then(response => {
        this.setState({
          ...this.state,
          loggedInUser: response
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          loggedInUser: false
        });
      });
  }

  setUser = userObj => {
    this.setState({
      ...this.state,
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.authService.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };
}
