import React from 'react'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => console.log(err))
  }

  render() {
    console.log('render state', this.state)
    const { errors } = this.state
    return (
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <h2 className="title">Register</h2>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input 
                      className={`input ${errors.username ? 'is-danger' : ''}`}
                      name="username"
                      placeholder="Username"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.username && <small className="help is-danger">{errors.username}</small>}
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input 
                      className={`input ${errors.email ? 'is-danger' : ''}`}
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.email && <small className="help is-danger">{errors.email}</small>}
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input 
                      className={`input ${errors.password ? 'is-danger' : ''}`}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.password && <small className="help is-danger">{errors.password}</small>}
                </div>

                <div className="field">
                  <label className="label">Password Confirmation</label>
                  <div className="control">
                    <input 
                      className={`input ${errors.password ? 'is-danger' : ''}`}
                      name="password_confirmation"
                      type="password"
                      placeholder="Password Confirmation"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.password && <small className="help is-danger">{errors.password}</small>}
                </div>

                <button type="submit" className="button is-info">Register</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default Register