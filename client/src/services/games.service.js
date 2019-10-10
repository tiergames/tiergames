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

  in7days = async (limit, offset) => {
    const in7Days = new Date().setDate(from.getDate() + 7);
    const from = Math.round(new Date().getTime() / 1000);
    const to = in7Days / 1000;

    let gamesIn7Days = await this.service.get(
      `?offset=${offset}&limit=${limit}&from=${from}&to=${to}&sorting=first_release_date&order=asc`
    );
    return gamesIn7Days;
  };
}
