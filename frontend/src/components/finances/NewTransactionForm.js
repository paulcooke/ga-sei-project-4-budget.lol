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
        date_in_month: '',
        one_off_date: '',
        annual_date: '',
        amount: '',
        category: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target: { name, value, type, checked } }) {
    const newValue = type === 'checkbox' ? checked : value // might be able to take checked out if dont end up using it
    const transaction = { ...this.state.transaction, [name]: newValue }
    this.setState({ transaction })
  }

  // leaving yearly recurrance out to start with, will add if there is time

  render() {
    console.log('new transaction props', this.props)
    console.log('new transaction state', this.state)
    const { transaction } = this.state
    return (
      <form className="list-payment">
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

        <div className="form-field">
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
            <div>each</div>
            <div className="form-field">
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
            <div className="form-field">
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
          <div className="form-field">
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
        }

        { transaction.name !== '' && 
          transaction.recurrance !== '' &&
          (transaction.day_of_week !== '' || transaction.date_in_month !== '' || transaction.one_off_date !== '') &&
          <>
            <i className="fas fa-pound-sign"></i>
            <div className="form-field">
              <div className="control">
                <input
                  className="input"
                  name="amount"
                  type="number"
                  value={transaction.amount}
                  onChange={this.handleChange}
                  placeholder="how much"
                />
              </div>
            </div>
          </>
        }

        {transaction.amount !== '' && 
          <button className="button" value={this.props.category} type="submit">add</button>
        }

      </form>
    )
  }
  
} 

export default NewTransactionForm