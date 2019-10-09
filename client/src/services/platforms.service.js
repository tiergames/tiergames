import axios from "axios"

export default class PlatformsService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/platforms"
    })
  }

  platforms = async () => {
    let platforms = await this.service.get('/')
    return platforms.data
  }
}