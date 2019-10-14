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

  getReviewsPerGame = async (gameID) => {
    let reviewsPerGame = await this.service.get(`/game/${gameID}`)
    return reviewsPerGame.data
  }

  deleteReview = async (reviewID) => {
    let deletedReview = await this.service.delete(`/delete/${reviewID}`)
    return deletedReview.data
  }

  getRelationatedReviews = async (gameID, currentReviewID) => {
    let relationatedReviews = await this.service.get(`/relationated/${gameID}/${currentReviewID}`)
    return relationatedReviews.data
  }

  createReview = async (reviewData, userID) => {
    console.log("REVIEW DATA", reviewData)
    console.log("AUTHOR", userID)
  }
}
