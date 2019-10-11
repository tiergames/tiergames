import axios from 'axios'

export default class ReviewsService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/reviews"
    })
  }

  getReviews = async (offset, limit) => {
    let reviews = await this.service.get(`?limit=${limit}&offset=${offset}`)
    return reviews.data
  }
}
