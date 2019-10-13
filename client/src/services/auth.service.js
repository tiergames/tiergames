import axios from 'axios'

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/auth",
      withCredentials: true
    })
  }

  signup = (username, email, password) => {
    return this.service.post("/signup", {username, email, password})
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post("/login", {username, password})
      .then(response => response.data)
  }

  confirmAccount = (token) => {
    return this.service.post(`/confirm/${token}`)
      .then(response => response.data)
  }

  forgotPassword = (email) => {
    return this.service.post("/forgot-password", {email})
      .then(response => response.data)
  }

  resetPassword = (token) => {
    return this.service.post(`/reset-password/${token}`)
      .then(response => response.data)
  }

  updatePassword = (password, token) => {
    return this.service.post(`/update-password/${token}`, {password})
      .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get("/currentuser")
      .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
      .then(response => response.data)
  }
}