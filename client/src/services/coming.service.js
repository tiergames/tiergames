import axios from "axios";

export default class ComingService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/coming-soon"
    });
  }

  coming = async () => {
    const comingGames = await this.service.get("/");
    return comingGames.data;
  };
}
