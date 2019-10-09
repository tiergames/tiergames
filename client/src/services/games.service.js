import axios from "axios"

export default class GamesService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/games"
    })
  }

  getGamesWithPagination = async (limit, offset) => {
    let allGames = await this.service.get(`?offset=${offset}&limit=${limit}`)
    return allGames
  }
}
