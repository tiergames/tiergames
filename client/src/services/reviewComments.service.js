import axios from 'axios'

export default class ReviewCommentsService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/reviewComments'
    })
  }

  loadComments = async (offset, limit, reviewID) => {
    let comments = await this.service.get(`/?reviewID=${reviewID}`)
    console.log(comments.data)
    return comments.data
  }

  addComment = async (comment) => {
    // console.log("RECIEVING THE COMMENT:::", comment)
    let makeCommentResult = await this.service.post(`/add`, comment)
    return makeCommentResult.data
  }
}
