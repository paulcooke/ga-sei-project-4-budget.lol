/* eslint-disable camelcase */
import React from 'react'
// import DatePicker from 'react-datepicker'
// may need to import link from react-router-dom


class NewTransactionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transaction: {
        recurrance: '',
        name: '',
        day_of_week: '',
        date_in_month: null,
        one_off_date: null,
        annual_date: null,
        amount: '',
        category: '',
        transaction_is_debit: true
      }
    }

    this.stateReset = {
      transaction: {
        recurrance: '',
        name: '',
        day_of_week: '',
        date_in_month: null,
        one_off_date: null,
        annual_date: null,
        amount: '',
        category: '',
        transaction_is_debit: true
      }
    }
    
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const day_of_week = (name === 'day_of_week' && this.state.transaction.recurrance === 'weekly') ? value : (name === 'recurrance' && value !== 'weekly') ? '' : this.state.transaction.day_of_week
    const date_in_month = (name === 'date_in_month' && this.state.transaction.recurrance === 'monthly') ? value : (name === 'recurrance' && value !== 'monthly') ? null : this.state.transaction.date_in_month
    const one_off_date = (name === 'one_off_date' && this.state.transaction.recurrance === 'one-off') ? value : (name === 'recurrance' && value !== 'one-off') ? null : this.state.transaction.one_off_date
    // const annual_date = name === 'recurrance' && value === 'one-off' ? value : null
    const transaction_is_debit = this.props.category === 'moneyin' ? false : true
    const transaction = { 
      ...this.state.transaction, 
      [name]: value, 
      category: this.props.category, 
      transaction_is_debit,
      day_of_week,
      date_in_month,
      one_off_date
    }
    this.setState({ transaction })
  }

  resetState() {
    this.setState({ transaction: this.stateReset.transaction })
  }

  // leaving yearly recurrance out to start with, will add if there is time

  render() {
    // console.log('new transaction props', this.props)
    // console.log('new transaction state', this.state)
    const { transaction } = this.state
    return (
      <>
        <small>add new transaction</small>
        <form className={`list-payment ${this.props.category === 'moneyin' ? 'list-payment-money-in' : '' }`}
          onSubmit={(e) => {
            e.preventDefault()
            console.log(this.props.accountId, transaction)
            this.props.handleSubmitNewTransaction(this.props.accountId, transaction)
            this.resetState()
          }}>

          <div className="form-field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                value={transaction.name}
              />
            </div>
          </div>

          <div className="form-field specific-date-field">
            <div className="select">
              <select name="recurrance" onChange={this.handleChange} value={transaction.recurrance}>
                <option value="" disabled>select recurrance</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="one-off">one-off</option>
              </select>
            </div>
          </div>

          {transaction.recurrance === 'weekly' &&
            <>
              <div>on</div>
              <div className="form-field specific-date-field">
                <div className="select">
                  <select name="day_of_week" onChange={this.handleChange} value={transaction.day_of_week}>
                    <option value="" disabled>choose day</option>
                    <option value="monday">monday</option>
                    <option value="tuesday">tuesday</option>
                    <option value="wednesday">wednesday</option>
                    <option value="thursday">thursday</option>
                    <option value="friday">friday</option>
                    <option value="saturday">saturday</option>
                    <option value="sunday">sunday</option>
                  </select>
                </div>
              </div>
            </>
          }

          {transaction.recurrance === 'monthly' &&
            <>
              <div>on</div>
              <div className="form-field specific-date-field">
                <div className="control">
                  <input
                    className="input"
                    name="date_in_month"
                    type="number"
                    max="28"
                    value={transaction.date_in_month}
                    onChange={this.handleChange}
                    placeholder="date (28 or below)"
                  />
                </div>
              </div>
            </>
          }

          {transaction.recurrance === 'one-off' &&
            <>
              <div>on</div>
              <div className="form-field specific-date-field">
                <div className="control">
                  <input
                    className="input"
                    name="one_off_date"
                    type="date"
                    value={transaction.one_off_date}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </>
          }

          { transaction.name !== '' && 
            transaction.recurrance !== '' &&
            (transaction.day_of_week !== '' || transaction.date_in_month !== '' || transaction.one_off_date !== '') &&
            <>
              <i className="fas fa-pound-sign"></i>
              <div className="form-field money-field">
                <div className="control">
                  <input
                    className="input"
                    name="amount"
                    type="float"
                    value={transaction.amount}
                    onChange={this.handleChange}
                    placeholder="how much"
                  />
                </div>
              </div>
            </>
          }

          {transaction.amount !== '' && 
            <button className="button" type="submit">add</button>
          }

        </form>
      </>
    )
  }
  
} 

export default NewTransactionForm