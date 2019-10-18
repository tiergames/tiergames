import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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
// import "./scss/main.scss"

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

    this.socket = io('http://localhost:3001')

    this.state = {
      loggedInUser: null,
      platforms: { isLoadingPlatforms: true, platforms: [], platformsFiltered: [], currentPlatform: null },
      genres: { isLoadingGenres: true, genres: [], genresFiltered: [], currentGenre: null },
      games: { isLoadingGames: true, games: [], gamesFiltered: [], currentGame: null },
      releases: {
        releases7DaysAgo: { isLoading7DaysAgo: true, releases7DaysAgo: [] },
        releases7Days: { isLoading7Days: true, releases7Days: [] },
        releases14Days: { isLoading14Days: true, releases14Days: [] },
        releases1Month: { isLoading1Month: true, releases1Month: [] },
        releases6Months: { isLoading6Months: true, releases6Months: [] },
        releases1Year: { isLoading1Year: true, releases1Year: [] }
      },
      reviews: { isLoadingReviews: true, reviews: [], reviewsFiltered: [], currentReviewFilter: null, pagination: { currentPage: 0, offset: 0, limit: 1 } },
      search: {
        games: { gamesResults: [], isSearchingGames: false },
        reviews: { reviewsResults: [], isSearchingReviews: false },
        users: { usersResults: [], isSearchingUsers: false },
        searchText: "",
        isSearching: false
      }
    };
    this.fetchUser();
  }

  render() {
    let routes = []
    routes = [
      { exact: true, path: "/login", component: () => <Login setUser={this.setUser} /> },
      { exact: true, path: "/signup", component: () => <Signup setUser={this.setUser} /> },
      { exact: true, path: "/forgot-password", component: ForgotPassword },
      { exact: true, path: "/reset-password/:resetPasswordToken", component: ResetPassword },
      { exact: true, path: "/update-password/:resetPasswordToken", component: ResetPassword },
      { exact: true, path: "/confirm/:confirmationToken", component: AccountConfirm },
    ]
    if (this.state.loggedInUser) {
      routes = [
        { exact: true, path: "/", component: Home },
        { exact: true, path: "/games", component: () => (<Games genres={this.state.genres} platforms={this.state.platforms} games={this.state.games} loggedInUser={this.state.loggedInUser}/>) },
        { exact: true, path: "/profile", component: () => <LoggedInUserProfile loggedInUser={this.state.loggedInUser} /> },
        { exact: true, path: "/profile/:username", render: (props) => <Profile {...props} loggedInUser={this.state.loggedInUser} /> },
        { exact: true, path: "/genres", component: () => (<Genres genres={this.state.genres} loggedInUser={this.state.loggedInUser}/>) },
        { exact: true, path: "/games/best-rated", component: () => <BestRated loggedInUser={this.state.loggedInUser} /> },
        { exact: true, path: "/games/coming-soon", component: () => (<ComingSoon releases={this.state.releases} loggedInUser={this.state.loggedInUser}/>) },
        { exact: true, path: "/games/:gameID", render: (props) => (<Game handleUnfollowRequest={(gameID) => this.handleUnfollowRequest(gameID)} handleFollowRequest={(gameID) => this.handleFollowRequest(gameID)} loggedInUser={this.state.loggedInUser} />) },
        { exact: true, path: "/reviews", component: () => (<Reviews reviews={this.state.reviews} handleLoadMore={() => this.loadReviews()} platforms={this.state.platforms} loggedInUser={this.state.loggedInUser} />)},
        { exact: true, path: "/reviews/create", component: () => (<CreateReview loggedInUser={this.state.loggedInUser} platforms={this.state.platforms.platforms} />)},
        { exact: true, path: "/reviews/:reviewID", component: props => (<Review {...props} loggedInUserName={this.state.loggedInUser.username} loggedInUserID={this.state.loggedInUser._id} loggedInUser={this.state.loggedInUser} />)},
        { exact: true, path: "/saved", component: props => (<Saved loggedInUser={this.state.loggedInUser} />)},
        { exact: true, path: "/platforms", component: () => (<Platforms platforms={this.state.platforms} loggedInUser={this.state.loggedInUser} />) },
        { exact: true, path: "/room", render: (props) => (<Room {...props} loggedInUser={this.state.loggedInUser} />) },
        { path: '*', component: Error404 }
      ];
    }
    
    return (
      <div>
        <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
        <SearchBar
          makeSearch={() => this.makeSearch()}
          games={this.state.search.games}
          reviews={this.state.search.reviews}
          users={this.state.search.users}
          updateSearchText={text => this.updateSearchText(text)}
          isSearching={this.state.search.isSearching}
        />
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.loadPlatforms();
    this.loadGenres();
    this.loadReviews();
    // this.loadGames();
    // this.loadReleases(1, "releases7DaysAgo", "desc", "isLoading7DaysAgo");
    // this.loadReleases(2, "releases7Days", "asc", "isLoading7Days");
    // this.loadReleases(3, "releases14Days", "asc", "isLoading14Days");
    // this.loadReleases(4, "releases1Month", "asc", "isLoading1Month");
    // this.loadReleases(5, "releases6Months", "asc", "isLoading6Months");
    // this.loadReleases(6, "releases1Year", "asc", "isLoading1Year");
  }

  async handleFollowRequest(gameID) {
    let followRequest = await this.gamesService.follow(gameID, this.state.loggedInUser._id)
    console.log("THE FOLLOW REQUEST", followRequest)
    if (followRequest.gameFollowRequestDone) {
      console.log("ME LLAMAN")
      let updatedLoggedInUser = {...this.state.loggedInUser}
      updatedLoggedInUser.savedGames = followRequest.follower.savedGames
      this.setState({ ...this.state, loggedInUser: updatedLoggedInUser })
    }
  }

  async handleUnfollowRequest(gameID) {
    let unfollowRequest = await this.gamesService.unfollow(gameID, this.state.loggedInUser._id)
    if (unfollowRequest.gameUnfollowRequestDone) {
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
    let genres = await this.genresService.getAllGenres();
    let newGenres = { ...this.state.genres };
    newGenres.isLoadingGenres = false;
    newGenres.genres = genres.data;
    newGenres.genresFiltered = genres.data;
    this.setState({ ...this.state, genres: newGenres });
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
