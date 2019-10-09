import axios from 'axios'

export default class GenresService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/genres"
    })
  }

  getAllGenres = async () => {
    let allGenres = await this.service.get("/")
    return allGenres
  }
}
