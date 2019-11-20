/* eslint-disable camelcase */
import React from 'react'
// import axios from 'axios'
// import Auth from '../../lib/auth'

class EditTransactionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transaction: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const transaction = {
      recurrance: this.props.recurrance,
      name: this.props.name,
      day_of_week: this.props.day_of_week,
      date_in_month: this.props.date_in_month,
      one_off_date: this.props.one_off_date,
      annual_date: this.props.annual_date,
      amount: this.props.amount,
      category: this.props.category,
      transaction_is_debit: this.props.transaction_is_debit,
      id: this.props.id
    }
    this.setState({ transaction: transaction })
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     const transaction = {
  //       recurrance: this.props.recurrance,
  //       name: this.props.name,
  //       day_of_week: this.props.day_of_week,
  //       date_in_month: this.props.date_in_month,
  //       one_off_date: this.props.one_off_date,
  //       annual_date: this.props.annual_date,
  //       amount: this.props.amount,
  //       category: this.props.category,
  //       transaction_is_debit: this.props.transaction_is_debit,
  //       id: this.props.id
  //     }
  //     this.setState({ transaction: transaction })
  //   }
  // }

  // the day_of_week, date_in_month & one_off_date fields need to update correctly if changed, keep their state value if something else changes, and clear their values if recurrance changes
  // needed to prevent it being possible to submit transaction edits with more than one of these fields populated, which would ruin the transaction entry by making it impossible to understand which recurrance/date was chosen
  handleChange({ target: { name, value } }) {
    const day_of_week = (name === 'day_of_week' && this.state.transaction.recurrance === 'weekly') ? value : (name === 'recurrance' && value !== 'weekly') ? '' : this.state.transaction.day_of_week
    const date_in_month = (name === 'date_in_month' && this.state.transaction.recurrance === 'monthly') ? value : (name === 'recurrance' && value !== 'monthly') ? null : this.state.transaction.date_in_month
    const one_off_date = (name === 'one_off_date' && this.state.transaction.recurrance === 'one-off') ? value : (name === 'recurrance' && value !== 'one-off') ? null : this.state.transaction.one_off_date
    const transaction = { 
      ...this.state.transaction, 
      [name]: value,
      day_of_week,
      date_in_month,
      one_off_date
    }
    this.setState({ transaction })
  }

  render() {
    console.log('edit transaction props', this.props)
    console.log('edit transaction state', this.state)
    const { name, recurrance, day_of_week, date_in_month, one_off_date, amount } = this.state.transaction
    return (
      <>
        <div className="list-payment">
          
          <form className={`list-payment ${this.props.category === 'moneyin' ? 'list-payment-money-in' : '' }`}
            onSubmit={(e) => {
              e.preventDefault()
              this.props.handleUpdateTransaction(this.state.transaction.id, this.state.transaction)
            }}>

            <div className="form-field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder={this.props.placeholder}
                  onChange={this.handleChange}
                  value={name}
                />
              </div>
            </div>

            <div className="form-field specific-date-field">
              <div className="select">
                <select name="recurrance" onChange={this.handleChange} value={recurrance}>
                  <option value="" disabled>select recurrance</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                  <option value="one-off">one-off</option>
                </select>
              </div>
            </div>

            {recurrance === 'weekly' &&
              <>
                <div>on</div>
                <div className="form-field specific-date-field">
                  <div className="select">
                    <select name="day_of_week" onChange={this.handleChange} value={day_of_week}>
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

            {recurrance === 'monthly' &&
              <>
                <div>on</div>
                <div className="form-field specific-date-field">
                  <div className="control">
                    <input
                      className="input"
                      name="date_in_month"
                      type="number"
                      max="28"
                      value={date_in_month}
                      onChange={this.handleChange}
                      placeholder="date (28 or below)"
                    />
                  </div>
                </div>
              </>
            }

            {recurrance === 'one-off' &&
              <>
                <div>on</div>          
                <div className="form-field specific-date-field">
                  <div className="control">
                    <input
                      className="input"
                      name="one_off_date"
                      type="date"
                      value={one_off_date}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </>
            }

            { name !== '' && 
              recurrance !== '' &&
              (day_of_week !== '' || date_in_month !== '' || one_off_date !== '') &&
              <>
                <i className="fas fa-pound-sign"></i>
                <div className="form-field money-field">
                  <div className="control">
                    <input
                      className="input"
                      name="amount"
                      type="number"
                      value={amount}
                      onChange={this.handleChange}
                      placeholder="amt"
                    />
                  </div>
                </div>
              </>
            }

            {amount !== '' && 
              <button className="button" type="submit">update</button>
            }
            
            <div className="button form-field" onClick={(e) => {
              e.preventDefault()
              this.props.handleDeleteTransaction(this.state.transaction.id)
            }}>
              <i className="far fa-trash-alt"></i>
            </div>
          </form>
          
        </div>
      </>
    )
  }
}

export default EditTransactionForm
