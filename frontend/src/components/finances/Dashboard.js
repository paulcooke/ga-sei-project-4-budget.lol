import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import AccountsList from './AccountsList'
import NewTransactionForm from './NewTransactionForm'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      accounts: [],
      selectedAccountId: ''
    }

    this.handleSelectAccount = this.handleSelectAccount.bind(this)
    this.handleSubmitNewTransaction = this.handleSubmitNewTransaction.bind(this)
  }

  componentDidMount() {
    this.getDashboardInfo()
  }

  getDashboardInfo() {
    axios.get('/api/accounts', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ accounts: res.data }))
      .then(() => {
        if (this.state.selectedAccountId === '') {
          const selectedAccountId = this.state.accounts.find(account => account.is_main_account === true).id
          this.setState({ selectedAccountId })
        }
      })
      .catch(err => console.log(err.message))
  }

  handleSelectAccount(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ selectedAccountId: e.target.value })
  }

  handleSubmitNewTransaction() {

  }

  render() {
    console.log('dashboard state', this.state)
    console.log(this.state.selectedAccountId)
    const { accounts } = this.state
    return (
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-four-fifths">
            <h1 className="title is-2">bananas</h1>
            <div>

              <div className="message is-info">
                <div className="message-header">
                  <p>Manage your account</p>
                </div>
                <div className="message-body">
                  {accounts && 
                  <AccountsList
                    accounts={accounts}
                    handleSelectAccount={this.handleSelectAccount}
                    selectedAccountId={this.state.selectedAccountId}
                  />}
                </div>
              </div>

              <div className="box">
                <h2 className="title is-3">Graph will go here</h2>
              </div>

              <h3 className="title is-3">Money In</h3>

              <div className="message is-success">
                <div className="message-header money-in-header">
                  <p><i className="fas fa-plus-circle"></i> Earnings</p>
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
                <div className="message-body">
                  <NewTransactionForm 
                    placeholder="e.g rent, mortgage"
                    category="accomodation"
                  />
                </div>

                <div className="message-header money-out-header">
                  <p><i className="fas fa-plus-circle"></i> Utilities & bills</p>
                </div>
                <div className="message-body">
                  <NewTransactionForm 
                    placeholder="e.g gas, water"
                    category="utilities"
                  />
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