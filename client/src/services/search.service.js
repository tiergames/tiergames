import axios from 'axios'

export default class SearchService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api/search`
    })
  }

  makeGamesSearch = async (searchText) => {
    let gamesSearchResults = await this.service.get(`/games?s=${searchText}`)
    return gamesSearchResults.data
  }

  makeReviewsSearch = async (searchText) => {
    let reviewsSearchResults = await this.service.get(`/reviews?s=${searchText}`)
    return reviewsSearchResults.data
  }

  makeUsersSearch = async (searchText) => {
    let usersSearchResults = await this.service.get(`/users?s=${searchText}`)
    return usersSearchResults.data
  }
}
