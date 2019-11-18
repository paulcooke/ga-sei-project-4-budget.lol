import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import AccountsList from './AccountsList'
import NewTransactionForm from './NewTransactionForm'
import EditTransactionForm from './EditTransactionForm'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      accounts: [],
      selectedAccountId: '',
      panels: {
        accomodation: false,
        utilities: false,
        travel: false,
        food: false,
        entertainment: false,
        insurance: false,
        credit: false,
        other: false
      }
    }

    this.categories = {
      categoryList: [
        { name: 'accomodation', title: 'Accomodation', placeholder: 'e.g rent' },
        { name: 'utilities', title: 'Utilities & bills', placeholder: 'e.g gas, internet' },
        { name: 'travel', title: 'Travel', placeholder: 'e.g gas, commute' },
        { name: 'food', title: 'Food & drink', placeholder: 'e.g lunch' },
        { name: 'entertainment', title: 'Life & entertainment', placeholder: 'e.g cinema' },
        { name: 'insurance', title: 'Insurance', placeholder: 'e.g car insurance' },
        { name: 'credit', title: ' Credit cards & loans', placeholder: 'e.g credit card' },
        { name: 'other', title: ' Other', placeholder: 'e.g anthything' }
      ]
    }

    // this.handleSelectAccount = this.handleSelectAccount.bind(this)
    this.handleSubmitNewTransaction = this.handleSubmitNewTransaction.bind(this) //not an event handler so does it need binding?
    this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this) // not sure needs binding
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this) // not sure needs binding
    // this.handlePanels = this.handlePanels.bind(this)
  }

  componentDidMount() {
    this.getDashboardInfo()
  }

  getDashboardInfo() {
    axios.get('/api/accounts', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ accounts: res.data }))
      // below is in preparation for multiple accounts, sets initial account ot display.
      .then(() => {
        if (this.state.selectedAccountId === '') {
          const selectedAccountId = this.state.accounts.find(account => account.is_main_account === true).id
          this.setState({ selectedAccountId })
        }
      })
      .catch(err => console.log(err.message))
  }

  transactionFilter(transactionCategory) {
    return this.state.accounts[0].future_transactions.filter(transaction => transaction.category === transactionCategory)
  }

  handlePanels(e) {
    e.preventDefault()
    const panelName = e.target.value
    const panels = { ...this.state.panels, panelName: !this.setState.panelName }
    this.setState({ panels })
  }

  // handleSelectAccount(e) {
  //   e.preventDefault()
  //   console.log(e.target.value)
  //   this.setState({ selectedAccountId: e.target.value })
  // }

  handleSubmitNewTransaction(accountId, transaction) {
    axios.post(`/api/accounts/${accountId}/futuretransactions`, { ...transaction }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getDashboardInfo())
      .catch(err => console.log(err.message))
  }

  handleUpdateTransaction(transactionId, transaction) {
    axios.put(`/api/futuretransactions/${transactionId}`, { ...transaction }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getDashboardInfo())
      .catch(err => console.log(err.message))
  }

  handleDeleteTransaction(transactionId) {
    axios.delete(`/api//futuretransactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getDashboardInfo())
      .catch(err => console.log(err.message))
  }

  render() {
    console.log('dashboard state', this.state)
    console.log(this.state.selectedAccountId)
    const { accounts, selectedAccountId } = this.state
    return (
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-four-fifths">
            <h1 className="title is-2">Time to budget, lol.</h1>
            <div>

              <div className="message is-info">
                <div className="message-header">
                  <p>Manage your account</p>
                </div>
                <div className="message-body">
                  {accounts && 
                  <AccountsList
                    accounts={accounts}
                    selectedAccountId={selectedAccountId}
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

              {
                this.categories.categoryList.map(category => (
                  <div className="message is-warning" key={category.name} onClick={this.handlePanels} value={category.name}>
                    <div className="message-header money-out-header">
                      <p><i className="fas fa-plus-circle"></i> {category.title}</p>
                    </div>
                    <div className="message-body">
                      {accounts && 
                        <NewTransactionForm 
                          accountId={selectedAccountId}
                          handleSubmitNewTransaction={this.handleSubmitNewTransaction}
                          placeholder={category.placeholder}
                          category={category.name}
                        />
                      }
                    </div>
                    <div className="message-body">
                      {accounts.length > 0 && 
                        this.transactionFilter(category.name).map(transaction => (
                          <EditTransactionForm 
                            key={transaction.id}
                            { ...transaction }
                            handleDeleteTransaction={this.handleDeleteTransaction}
                            handleUpdateTransaction={this.handleUpdateTransaction}
                          />
                        ))
                      }
                    </div>
                  </div>

                ))
              }

            </div>
          </div>
        </div>
      </section> 
    )
  }

}

export default Dashboard