class Auth {

  // get & set token and logout

  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token')
  }


  // check authentication

  static getPayLoad() {
    const token = this.getToken()
    if (!token) return false
    const parts = token.split('.')
    if (parts.length < 3) return false
    return JSON.parse(atob(parts[1]))
  }

  static isAuthenticated() {
    const payLoad = this.getPayLoad()
    if (!payLoad) return false
    const now = Math.round(Date.now() / 1000)
    return now < payLoad.exp
  }
}

export default Auth