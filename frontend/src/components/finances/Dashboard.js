import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import AccountsList from './AccountsList'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    axios.get('/api/accounts', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ accounts: res.data }))
      .catch(err => console.log(err.message))
  }

  render() {
    console.log(this.state)
    const { accounts } = this.state
    return (
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-four-fifths">
            <h1 className="title is-2">bananas</h1>
            <div>

              <div className="message is-info">
                <div className="message-header">
                  <p>Your accounts</p>
                </div>
                <div className="message-body">
                  <AccountsList
                    accounts={accounts}
                  />
                </div>
              </div>

              <div className="box">
                <h2 className="title is-3">Graphs going here</h2>
              </div>

              <h3 className="title is-3">Money In</h3>

              <div className="message is-success">
                <div className="message-header money-in-header">
                  <p><i className="fas fa-plus-circle"></i> Earnings</p>
                </div>
                <div className="message-body">
                  <div className="list-payment">
                      blah
                  </div>
                </div>
                
                <div className="message-header money-in-header">
                  <p><i className="fas fa-plus-circle"></i> Other</p>
                </div>
              </div>

              <h3 className="title is-3">Money Out</h3>

              <div className="message is-warning">
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Accomodation</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Utilities & bills</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Travel</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Food & drink</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Life & entertainment</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Insurance</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Credit cards & loans</p>
                </div>
                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Other</p>
                </div>
              </div>



            </div>
          </div>
        </div>
      </section> 
    )
  }

}

export default Dashboard