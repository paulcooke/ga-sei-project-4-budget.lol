import React from 'react'
// import DatePicker from 'react-datepicker'
// may need to import link from react-router-dom



class NewTransactionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transaction: {
        frequency: '',
        name: '',
        dayOfWeek: '',
        dateInMonth: '',
        oneOff: '',
        amount: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target: { name, value, type, checked } }) {
    const newValue = type === 'checkbox' ? checked : value // might be able to take checked out if dont end up using it
    const transaction = { ...this.state.transaction, [name]: newValue }
    this.setState({ transaction })
  }

  // leaving yearly frequency out to start with, will add if there is time

  render() {
    console.log('props', this.props)
    console.log('state', this.state)
    const { transaction } = this.state
    return (
      <div className="list-payment">
        <div className="form-field">
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              placeholder={this.props.accomPlaceholder}
              onChange={this.handleChange}
              value={transaction.name}
            />
          </div>
        </div>

        <div className="form-field">
          <div className="select">
            <select name="frequency" onChange={this.handleChange} value={transaction.frequency}>
              <option value="" disabled>select frequency</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="one-off">one-off</option>
            </select>
          </div>
        </div>

        {transaction.frequency === 'weekly' &&
          <>
            <div>each</div>
            <div className="form-field">
              <div className="select">
                <select name="dayOfWeek" onChange={this.handleChange} value={transaction.dayOfWeek}>
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

        {transaction.frequency === 'monthly' &&
          <>
            <div>on</div>
            <div className="form-field">
              <div className="control">
                <input
                  className="input"
                  name="dateInMonth"
                  type="number"
                  value={transaction.dateInMonth}
                  onChange={this.handleChange}
                  placeholder="e.g type 3 for the 3rd"
                />
              </div>
            </div>
          </>
        }

        {transaction.frequency === 'one-off' &&
          <div className="form-field">
            <div className="control">
              <input
                className="input"
                name="oneOff"
                type="date"
                value={transaction.oneOff}
                onChange={this.handleChange}
              />
            </div>
          </div>
        }

        { transaction.name !== '' && 
          transaction.frequency !== '' &&
          (transaction.dayOfWeek !== '' || transaction.dateInMonth !== '' || transaction.oneOff !== '') &&
          <>
            <i className="fas fa-pound-sign"></i>
            <div className="form-field">
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
          <button className="button">add</button>
        }


      </div>
    )
  }
  
} 

export default NewTransactionForm