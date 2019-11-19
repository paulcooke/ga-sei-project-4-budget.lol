/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ChartHelpers from '../../lib/chartHelpers'

import NewAccountForm from './NewAccountForm'
import ManageAccounts from './ManageAccounts'
import NewTransactionForm from './NewTransactionForm'
import EditTransactionForm from './EditTransactionForm'
import RunningTotalChart from '../charts/RunningTotalChart'

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
        other: false,
        moneyIn: false
      },
      mainChartSettings: {
        dateAxis: [],
        dateAxisLength: 89,
        runningTotal: []
      },
      paymentsOutSeries: {},
      paymentsInSeries: {}

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

    this.handleSubmitNewTransaction = this.handleSubmitNewTransaction.bind(this) 
    this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this) 
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this) 
    this.handleNewAccount = this.handleNewAccount.bind(this) 
    this.handleUpdateAccount = this.handleUpdateAccount.bind(this) 
    this.handlePanels = this.handlePanels.bind(this)
  }

  componentDidMount() {
    this.getDashboardInfo()
  }

  getDashboardInfo() {
    axios.get('/api/accounts', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ accounts: res.data }))
      // below is in preparation for multiple accounts, sets initial account to display.
      .then(() => {
        if (this.state.selectedAccountId === '') {
          const selectedAccountId = this.state.accounts.find(account => account.is_main_account === true).id
          this.setState({ selectedAccountId })
        }
      })
      .then(() => {
        const mainChartSettings = { ...this.state.mainChartSettings, dateAxis: ChartHelpers.makeDateLine(this.state.mainChartSettings.dateAxisLength) }
        this.setState({ mainChartSettings })
      })
      .then(() => this.makePaymentsSeries())
      .then(() => this.makeRunningTotal())
      .catch(err => console.log(err.message))
  }


  makePaymentsSeries() {
    const transactions = this.state.accounts.find(account => account.is_main_account === true).future_transactions
    const paymentsOutSeries = {}
    const paymentsInSeries = {}
    transactions.forEach(transaction => {
      const { transaction_is_debit, recurrance, name, amount, day_of_week, date_in_month, one_off_date } = transaction
      if (transaction_is_debit) {
        if (recurrance === 'weekly') {
          paymentsOutSeries[name] = ChartHelpers.paymentsOnDays(day_of_week, -amount)
        } else if (recurrance === 'monthly') {
          paymentsOutSeries[name] = ChartHelpers.paymentsOnDates(date_in_month, -amount)
        } else if (recurrance === 'one-off') {
          paymentsOutSeries[name] = ChartHelpers.paymentsOneOff(one_off_date, -amount)
        }
      } else if (!transaction_is_debit) {
        if (recurrance === 'weekly') {
          paymentsInSeries[name] = ChartHelpers.paymentsOnDays(day_of_week, amount)
        } else if (recurrance === 'monthly') {
          paymentsInSeries[name] = ChartHelpers.paymentsOnDates(date_in_month, amount)
        } else if (recurrance === 'one-off') {
          paymentsInSeries[name] = ChartHelpers.paymentsOneOff(one_off_date, amount)
        }
      }
    })
    this.setState({ paymentsOutSeries, paymentsInSeries })
  }

  makeRunningTotal() {
    const outCombined = []
    const inCombined = []
    // loop through transactions object and push the payments out arrays in
    for (const payment in this.state.paymentsOutSeries) {
      outCombined.push(this.state.paymentsOutSeries[payment])
    }
    const outLine = outCombined.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
    console.log('=> outline test', outLine)
    
    // same for payments in
    for (const payment in this.state.paymentsInSeries) {
      inCombined.push(this.state.paymentsInSeries[payment])
    }
    const inLine = inCombined.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
    console.log('=> inline test', inLine)
    // combine the two into an array that can be used to make a running total

    let changeLine
    if (outLine.length > 0) {
      changeLine = [inLine, outLine].reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
    } else {
      changeLine = inLine
    }
    
    // add current balance to first value of changeLine
    changeLine[0] += this.state.accounts[0].current_balance
    console.log('changeLine test', changeLine)

    const runningTotal = changeLine.reduce(function(r, a) {
      if (r.length > 0)
        a += Math.round(r[r.length - 1])
      r.push(a)
      return r
    }, [])
    const mainChartSettings = { ...this.state.mainChartSettings, runningTotal }
    this.setState({ mainChartSettings })
  }

  transactionFilter(transactionCategory) {
    return this.state.accounts[0].future_transactions.filter(transaction => transaction.category === transactionCategory)
  }

  handlePanels(panelName) {
    // e.preventDefault()
    console.log(this.state.panels[panelName])
    const panels = { ...this.state.panels, [panelName]: !this.state.panels[panelName] }
    this.setState({ panels })
  }

  handleNewAccount(accountDetails) {
    axios.post('/api/accounts', { ...accountDetails }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getDashboardInfo())
      .catch(err => console.log(err.mesasge))
  }

  handleUpdateAccount(accountDetails) {
    axios.put(`/api/accounts/${this.state.selectedAccountId}`, { ...accountDetails }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getDashboardInfo())
      .catch(err => console.log(err.mesasge))
  }

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

  
  // console.log('days test', ChartHelpers.paymentsOnDays())
  // console.log('dates test', ChartHelpers.paymentsOnDates())
  // console.log('one-off test', ChartHelpers.paymentsOneOff())
  // {this.state.accounts.length > 0 && console.log('changeline', this.makeRunningTotal())}

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
                  {accounts.length > 0 && 
                    <ManageAccounts
                      { ...accounts[0] }
                      handleUpdateAccount={this.handleUpdateAccount}
                    />
                  }
                  {accounts.length === 0 &&
                    <>
                      <p>create your account to get started</p>
                      <NewAccountForm 
                        handleNewAccount={this.handleNewAccount}
                      />
                    </>
                  }
                </div>
              </div>

              <h3 className="title is-3">Money In</h3>

              <div className="message is-success">
                <div className="message-header money-in-header">
                  <p><i className="fas fa-plus-circle" onClick={() => this.handlePanels('moneyIn')}></i> Add regular or one-off income</p>
                </div>
                {this.state.panels['moneyIn'] === true &&
                  <>
                    <div className="message-body">
                      {accounts && 
                        <NewTransactionForm 
                          accountId={selectedAccountId}
                          handleSubmitNewTransaction={this.handleSubmitNewTransaction}
                          placeholder="e.g. takehome pay"
                          category="moneyin"
                        />
                      }
                    </div>
                    <div className="message-body">
                      {accounts.length > 0 && 
                        this.transactionFilter('moneyin').map(transaction => (
                          <EditTransactionForm 
                            key={transaction.id}
                            { ...transaction }
                            handleDeleteTransaction={this.handleDeleteTransaction}
                            handleUpdateTransaction={this.handleUpdateTransaction}
                          />
                        ))
                      }
                    </div>
                  </>
                }
                
              </div>

              <div className="chart-container">
                <RunningTotalChart 
                  { ...this.state.mainChartSettings }
                />
              </div>

              <h3 className="title is-3">Money Out</h3>

              {
                this.categories.categoryList.map(category => (
                  <div className="message is-warning money-out" key={category.name}>
                    <div className="message-header money-out-header">
                      <p><i className="fas fa-plus-circle" onClick={() => this.handlePanels(category.name)}></i> {category.title}</p>
                    </div>
                    {this.state.panels[category.name] === true &&
                    <>
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
                    </>
                    }
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