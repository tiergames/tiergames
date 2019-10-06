import axios from 'axios'

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/auth",
      withCredentials: true
    })
  }

  signup = (username, email, password, confirmPassword) => {
    return this.service.post("/signup", {username, email, password, confirmPassword})
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post("/login", {username, password})
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