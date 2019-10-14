import axios from 'axios'

export default class GenresService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api/genres`
    })
  }

  getAllGenres = async () => {
    let allGenres = await this.service.get("/")
    return allGenres
  }
}
