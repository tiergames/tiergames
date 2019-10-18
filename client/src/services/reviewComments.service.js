import axios from 'axios'

export default class ReviewCommentsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api/reviewComments`
    })
  }

  loadComments = async (offset, limit, reviewID) => {
    let comments = await this.service.get(`/?reviewID=${reviewID}`)
    return comments.data
  }

  addComment = async (comment) => {
    let makeCommentResult = await this.service.post(`/add`, comment)
    return makeCommentResult.data
  }
}
