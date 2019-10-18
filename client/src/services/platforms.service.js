import axios from "axios"

// TODO: Este servicio ya no nos sirve? Ahora las platforms se cargan en APP
export default class PlatformsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api/platforms`
    })
  }

  platforms = async () => {
    const platforms = await this.service.get('/')
    return platforms.data
  }
}