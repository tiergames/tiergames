import axios from "axios";

export default class BestRatedService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/best-rated"
    });
  }

  bestRated = async () => {
    let bestRatedGames = await this.service.get("/");
    console.log("bestRatedGames", bestRatedGames);

    return bestRatedGames.data;
  };
}
