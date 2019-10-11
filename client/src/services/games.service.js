import axios from "axios"

export default class GamesService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/games"
    })
  }

  getGames = async (limit, offset) => {
    let allGames = await this.service.get(`?offset=${offset}&limit=${limit}`)
    return allGames
  }

  getGameName = async (gameID) => {
    let gameName = await this.service.get(`/game-name/${gameID}`)
    return gameName.data
  }

  getGameCover = async (gameID) => {
    let gameCoverUrl = await this.service.get(`/game-cover/${gameID}`)
    console.log("SERVICE URL", gameCoverUrl)
    return gameCoverUrl.data
  }
}
