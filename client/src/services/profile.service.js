import axios from 'axios'

export default class ProfileService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/profile'
    })
  }
  
  getProfile = async (username) => {
    let userProfile = await this.service.get(`/${username}`)
    return userProfile.data
  }

  follow = async (followed, follower) => {
    let followRequest = await this.service.put("/follow", { followed, follower })
    return followRequest.data
  }

  unfollow = async (followed, follower) => {
    let unfollowRequest = await this.service.put("/unfollow", { followed, follower })
    return unfollowRequest.data
  }
}
