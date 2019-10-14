import axios from "axios";

export default class GamesService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/games"
    });
  }

  getGames = async (limit, offset) => {
    let allGames = await this.service.get(`?offset=${offset}&limit=${limit}`);
    return allGames;
  };

  getBestRated = async (limit, offset, order) => {
    let bestRatedGames = await this.service.get(`?offset=${offset}&limit=${limit}&sorting=rating&order=${order}`);
    return bestRatedGames;
  }

  getGameName = async (gameID) => {
    let gameName = await this.service.get(`/game-name/${gameID}`)
    return gameName.data
  }

  getGameCover = async (gameID) => {
    let gameCoverUrl = await this.service.get(`/game-cover/${gameID}`)
    return gameCoverUrl.data
  }
  getReleases = async (limit, offset, period, order) => {
    let from, to;
    let fromDays, toDays;

    switch (period) {
      case 1: fromDays = -7;  toDays = 0;   break; // a week ago
      case 2: fromDays = 0;   toDays = 7;   break; // next week
      case 3: fromDays = 7;   toDays = 14;  break; // next 2 weeks
      case 4: fromDays = 14;  toDays = 30;  break; // next 30 days (month)
      case 5: fromDays = 30;  toDays = 180; break; // next 6 months
      case 6: fromDays = 180; toDays = 365; break; // next 1 year
    }

    from = Math.round(new Date().setDate(new Date().getDate() + fromDays) / 1000);
    to = Math.round(new Date().setDate(new Date().getDate() + toDays) / 1000);

    let allReleases = await this.service.get(
      `?offset=${offset}&limit=${limit}&from=${from}&to=${to}&sorting=first_release_date&order=${order}`
    );
    return allReleases;
  };
}
