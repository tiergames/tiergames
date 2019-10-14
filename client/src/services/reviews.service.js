import axios from 'axios'

export default class ReviewsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api/reviews`
    })
  }

  getReviews = async (offset, limit) => {
    let reviews = await this.service.get(`?limit=${limit}&offset=${offset}`)
    return reviews.data
  }

  getReviewsPerPlatform = async (offset, limit, platformID) => {
    let reviewsPerPlatform = await this.service.get(`/${platformID}`)
    return reviewsPerPlatform
  }
}
