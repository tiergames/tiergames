import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom'
import AuthService from "./services/auth.service";
import io from 'socket.io-client'

// Pages
import Home from "./pages/Public/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import AccountConfirm from "./pages/Auth/AccountConfirm/AccountConfirm";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Error404 from "./pages/errors/Error404/Error404";
import Profile from "./pages/private/Profile/Profile";
import LoggedInUserProfile from "./pages/private/LoggedInUserProfile/LoggedInUserProfile";
import Games from "./pages/private/Games/Games";
import Genres from "./pages/private/Genres/Genres";
import Platforms from "./pages/private/Platforms/Platforms";
import CreateReview from "./pages/private/Reviews/CreateReview/CreateReview";
import Game from "./pages/private/Game/Game";
import Review from "./pages/private/Reviews/Review/Review";
import Saved from "./pages/private/Saved/Saved";
import Room from "./pages/private/Room/Room";

// Components
import Navbar from "./components/Navbar/Navbar";
import BestRated from "./pages/private/BestRated/BestRated";
import ComingSoon from "./pages/private/ComingSoon/ComingSoon";
import Reviews from "./pages/private/Reviews/Reviews";

// Services
import ReviewsService from "./services/reviews.service";
import PlatformsService from "./services/platforms.service";
import GenresService from "./services/genres.service";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchService from "./services/search.service";
import GamesService from "./services/games.service";
import ProfileService from "./services/profile.service";

// Styles
import './styles/main.scss'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
    this.reviewsService = new ReviewsService()
    this.platformsService = new PlatformsService()
    this.genresService = new GenresService()
    this.searchService = new SearchService()
    this.gamesService = new GamesService()
    this.profileService = new ProfileService()

    this.socket = io(`${process.env.REACT_APP_SERVER_BASE_URL}`)

    this.state = {
      loading: true,
      loggedInUser: null,
      platforms: { isLoadingPlatforms: true, platforms: [], platformsFiltered: [], currentPlatform: [] },
      genres: { isLoadingGenres: true, genres: [], currentGenre: [] },
      games: { isLoadingGames: true, games: [], gamesFiltered: [], currentGame: null },
      bestRated: { isLoadingBestRated: true, bestRated: [] },
      releases: {
        releases7DaysAgo: { isLoading7DaysAgo: true, releases7DaysAgo: [] },
        releases7Days: { isLoading7Days: true, releases7Days: [] },
        releases14Days: { isLoading14Days: true, releases14Days: [] },
        releases1Month: { isLoading1Month: true, releases1Month: [] },
        releases6Months: { isLoading6Months: true, releases6Months: [] },
        releases1Year: { isLoading1Year: true, releases1Year: [] }
      },
      reviews: { isLoadingReviews: true, reviews: [], reviewsFiltered: [], currentReviewFilter: null, pagination: { currentPage: 0, offset: 0, limit: 10 } },
      search: {
        games: { gamesResults: [], isSearchingGames: false },
        reviews: { reviewsResults: [], isSearchingReviews: false },
        users: { usersResults: [], isSearchingUsers: false },
        searchText: "",
        isSearching: false
      },
      newFollower: null
    };
  }

  render() {
    let routes = []
    routes = [
      { exact: true, path: "/login", render: () => (<Login setUser={this.setUser} />) },
      { exact: true, path: "/logout", render: ({history }) => this.logout(history) },
      { exact: true, path: "/signup", render: () => (<Signup setUser={this.setUser} />) },
      { exact: true, path: "/forgot-password", component: ForgotPassword },
      { exact: true, path: "/reset-password/:resetPasswordToken", component: ResetPassword },
      { exact: true, path: "/update-password/:resetPasswordToken", component: ResetPassword },
      { exact: true, path: "/confirm/:confirmationToken", component: AccountConfirm },
      { exact: true, auth: true, path: "/", render: () => (<Home releases={this.state.releases} loggedInUser={this.state.loggedInUser}/>)},
      {
        exact: true,
        auth: true,
        path: "/games",
        render: () => (
          <Games
            genres={this.state.genres}
            platforms={this.state.platforms}
            games={this.state.games}
            onPlatformFilterChange={(platformsFilter) => this.handlePlatformFilterChange(platformsFilter)}
            onGenreFilterChange={(genresFilter) => this.handleGenreFilterChange(genresFilter)}
            onFilterApply={() => this.applyGameFilter()} 
            loggedInUser={this.state.loggedInUser}
          />
        )
      },
      { exact: true, auth: true, path: "/profile", render: () => (<LoggedInUserProfile loggedInUser={this.state.loggedInUser} logout={this.logout} />) },
      { exact: true, auth: true, path: "/profile/:username", render: (props) => (<Profile {...props} loggedInUser={this.state.loggedInUser} />) },
      { exact: true, auth: true, path: "/genres", render: () => (<Genres genres={this.state.genres} />) },
      { exact: true, auth: true, path: "/games/best-rated", render: () => <BestRated bestRated={this.state.bestRated} /> },
      { exact: true, auth: true, path: "/games/coming-soon", render: () => (<ComingSoon releases={this.state.releases} />) },
      { exact: true, auth: true, path: "/games/:gameID", render: () => (<Game handleUnfollowRequest={(gameID) => this.handleUnfollowRequest(gameID)} handleFollowRequest={(gameID) => this.handleFollowRequest(gameID)} loggedInUser={this.state.loggedInUser} />) },
      { exact: true, auth: true, path: "/reviews", render: () => (<Reviews reviews={this.state.reviews} handleLoadMore={() => this.loadReviews()} platforms={this.state.platforms} />)},
      { exact: true, auth: true, path: "/reviews/create/:gameID", render: props => (<CreateReview {...props} loggedInUser={this.state.loggedInUser} platforms={this.state.platforms.platforms} />)},
      { exact: true, auth: true, path: "/reviews/:reviewID", render: props => (<Review {...props} loggedInUserName={this.state.loggedInUser.username} loggedInUserID={this.state.loggedInUser._id} loggedInUser={this.state.loggedInUser} />)},
      { exact: true, auth: true, path: "/saved", render: () => (<Saved loggedInUser={this.state.loggedInUser} />)},
      { exact: true, auth: true, path: "/platforms", render: () => (<Platforms platforms={this.state.platforms} />) },
      { exact: true, auth: true, path: "/room", render: (props) => (<Room {...props} loggedInUser={this.state.loggedInUser} />) },
      { path: '*', component: Error404 }
    ]
    
    return (
      <div>
        {
          this.state.newFollower !== null
            ? <p>New follower: <Link to={`/profile/${this.state.newFollower.username}`}>{this.state.newFollower.username}</Link></p>
            : null
        }
        <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
        {
          !this.state.loggedInUser ? null
        : <SearchBar
        makeSearch={() => this.makeSearch()}
        games={this.state.search.games}
        reviews={this.state.search.reviews}
        users={this.state.search.users}
        updateSearchText={text => this.updateSearchText(text)}
        isSearching={this.state.search.isSearching}
      />
        }
        { this.state.loading === true && (<div>Loading</div>)}
        { this.state.loading === false && 
          (<Switch>
            {routes.map(route => {
              if (!this.state.loggedInUser && route.auth) {
                return (<Redirect key={Date.now()} to="/login" /> )
              }
              return (<Route key={route.path} {...route} />)
            })}
          </Switch>)
        }
      </div>
    );
  }

  componentDidMount() {
    const promises = [
      this.fetchUser(),
      this.loadPlatforms(),
      this.loadGenres(),
      this.loadReviews(),
      this.loadGames(),
      this.loadBestRated(),
      this.loadReleases(1, "releases7DaysAgo", "desc", "isLoading7DaysAgo"),
      this.loadReleases(2, "releases7Days", "asc", "isLoading7Days"),
      this.loadReleases(3, "releases14Days", "asc", "isLoading14Days"),
      this.loadReleases(4, "releases1Month", "asc", "isLoading1Month"),
      this.loadReleases(5, "releases6Months", "asc", "isLoading6Months"),
      this.loadReleases(6, "releases1Year", "asc", "isLoading1Year"),
    ];

    Promise.all(promises)
    .then(() => {
      this.setState({ loading: false });
    }).catch(err => {
      // TODO: Redirect a error?
      console.error(err)
    });
    

    this.socket.on('new-follower', (data) => {
      if (data.followed._id === this.state.loggedInUser._id) {
        this.setState({ newFollower: data.follower })
        setTimeout(() => {
          this.setState({ newFollower: null })
        }, 5000)
      }
    })
  }

  handlePlatformFilterChange(platformsFilter) {
    const { platforms } = this.state

    this.setState({
      platforms: {
        ...platforms, 
        currentPlatform: platformsFilter
      }
    });
  }

  handleGenreFilterChange(genresSelected) {
    const { genres } = this.state
    console.log(genresSelected);
    
    this.setState({
      genres: {
        ...genres, 
        currentGenre: genresSelected
      }
    });
  }

  async applyGameFilter() {
    const { currentGenre } = this.state.genres;
    const { currentPlatform } = this.state.platforms;
    
    const gamesFiltered = await this.gamesService.getGamesPerPlatformAndGenre(10, 0, currentPlatform, currentGenre)    
    const { games } = this.state;
    
    this.setState({ 
      games: {
        ...games,
        games: gamesFiltered,
      }
    });
    
  }
  
  async handleFollowRequest(gameID) {
    let followRequest = await this.gamesService.follow(gameID, this.state.loggedInUser._id)
    if (followRequest.gameFollowRequestDone) {
      console.log("CREATEDEDEDE", followRequest)
      let updatedLoggedInUser = {...this.state.loggedInUser}
      updatedLoggedInUser.savedGames = followRequest.follower.savedGames
      this.setState({ ...this.state, loggedInUser: updatedLoggedInUser })
    }
  }

  async handleUnfollowRequest(gameID) {
    let unfollowRequest = await this.gamesService.unfollow(gameID, this.state.loggedInUser._id)
    if (unfollowRequest.gameUnfollowRequestDone) {
      console.log("asdasdasdasd", unfollowRequest.follower)
      let updatedLoggedInUser = {...this.state.loggedInUser}
      updatedLoggedInUser.savedGames = unfollowRequest.follower.savedGames
      this.setState({ ...this.state, loggedInUser: updatedLoggedInUser })
    }
  }

  handleFollow(followers) {
    let newLoggedInUser = {...this.state.loggedInUser}
    newLoggedInUser.followers = followers
    this.setState({ ...this.state, loggedInUser: newLoggedInUser })
  }

  async loadPlatforms() {
    let platforms = await this.platformsService.platforms();
    let newPlatforms = { ...this.state.platforms };
    newPlatforms.isLoadingPlatforms = false;
    newPlatforms.platforms = platforms;
    newPlatforms.platformsFiltered = platforms;

    this.setState({ ...this.state, platforms: newPlatforms });
  }

  async loadGenres() {
    const genres = await this.genresService.getAllGenres();
    this.setState({
      genres: {
        ...this.state.genres,
        isLoadingGenres: false, 
        genres: genres.data
      } 
    });
  }

  async loadReviews() {
    let reviews = await this.reviewsService.getReviews(
      this.state.reviews.pagination.offset,
      this.state.reviews.pagination.limit
    );
    let newReviews = { ...this.state.reviews };
    newReviews.isLoadingReviews = false;
    newReviews.reviews = newReviews.reviews.concat(reviews);
    newReviews.reviewsFiltered = newReviews.reviewsFiltered.concat(reviews);
    newReviews.pagination.currentPage += 1;
    newReviews.pagination.offset =
      newReviews.pagination.limit * this.state.reviews.pagination.currentPage;
    this.setState({ ...this.state, reviews: newReviews });
  }

  updateSearchText(text) {
    let newSearch = { ...this.state.search };
    newSearch.searchText = text;
    this.setState({ ...this.state, search: newSearch });
  }

  async makeGamesSearch() {
    let newSearch = { ...this.state.search };
    newSearch.games.isSearchingGames = true;
    this.setState({ ...this.state, search: newSearch });

    let gamesResults = await this.searchService.makeGamesSearch(
      this.state.search.searchText
    );
    newSearch.games.gamesResults = gamesResults;
    newSearch.games.isSearchingGames = false;
    this.setState({ ...this.state, search: newSearch });
  }

  async makeReviewsSearch() {
    let newSearch = { ...this.state.search };
    newSearch.reviews.isSearchingReviews = true;
    this.setState({ ...this.state, search: newSearch });

    let reviewsResults = await this.searchService.makeReviewsSearch(
      this.state.search.searchText
    );
    newSearch.reviews.reviewsResults = reviewsResults;
    newSearch.reviews.isSearchingReviews = false;
    this.setState({ ...this.state, search: newSearch });
  }

  async makeUsersSearch() {
    let newSearch = { ...this.state.search };
    newSearch.users.isSearchingUsers = true;
    this.setState({ ...this.state, search: newSearch });

    let usersResults = await this.searchService.makeUsersSearch(
      this.state.search.searchText
    );
    newSearch.users.usersResults = usersResults;
    newSearch.users.isSearchingUsers = false;
    this.setState({ ...this.state, search: newSearch });
  }

  async makeSearch() {
    this.makeGamesSearch();
    this.makeReviewsSearch();
    this.makeUsersSearch();
  }

  async loadGames() {
    const games = await this.gamesService.getGames(10, 0);

    let newGames = { ...this.state };
    newGames.isLoadingGames = false;
    newGames.games = games.data;
    newGames.gamesFiltered = games.data;

    this.setState({ ...this.state, games: newGames });
  }

  async loadBestRated(order = "desc") {
    const bestRated = await this.gamesService.getBestRated(20, 0, order)

    let newState = { ...this.state };
    newState.bestRated = bestRated.data;
    this.setState(newState);
  }

  async loadReleases(period, statePeriod, order = "asc", isLoadingKey) {
    let released = await this.gamesService.getReleases(20, 0, period, order);

    let newState = { ...this.state.releases };
    newState[statePeriod][statePeriod] = released.data;
    newState[statePeriod][isLoadingKey] = false;
    this.setState(newState);
  }

  fetchUser() {
    return this.authService
      .loggedin()
      .then(response => {
        this.setState({ loggedInUser: response });
      })
      .catch(() => {
        this.setState({ loggedInUser: false });
      });
  }

  setUser = userObj => {
    this.setState({ loggedInUser: userObj });
  };

  // TODO: 404 Page not found showed on /logout. Investigate "withRouter"
  logout = (history) => {
    this.authService.logout()
      .then(() => {
        this.setState(
          { loggedInUser: null },
          () => {
            setTimeout(() => history.push({ pathname: '/login' }), 1500)
          });
      });
      return <div>Bye bye!!</div>
  };
}
