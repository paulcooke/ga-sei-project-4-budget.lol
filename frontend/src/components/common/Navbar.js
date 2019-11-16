import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  constructor() {
    super()

    this.state = { navOpen: false }

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  toggleNavbar() {
    this.setState({ navOpen: !this.state.navOpen })
  }

  // close navbar once you click on a path
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navOpen: false })
    }
  }

  handleLogout() {
    Auth.logout()
    this.props.history.push('/')
  }
  
  render() {
    return (
      <nav className="navbar is-info">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">Home</Link>
            <a 
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/dashboard">Dashboard</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
    
}

export default withRouter(Navbar)