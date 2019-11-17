import React from 'react'

class EditTransactionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transaction: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({ transaction: this.props })
  }

  handleChange({ target: { name, value } }) {
    const transaction = { ...this.state.transaction, [name]: value }
    this.setState({ transaction })
  }

  render() {
    console.log('edit transaction props', this.props)
    console.log('edit transaction state', this.state)
    const { name, recurrance, day_of_week, date_in_month, one_off_date, amount } = this.state.transaction
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
              value={name}
            />
          </div>
        </div>

        <div className="form-field">
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
            <div>each</div>
            <div className="form-field">
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
            <div className="form-field">
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
            <div className="form-field">
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
            <div className="form-field">
              <div className="control">
                <input
                  className="input"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={this.handleChange}
                  placeholder="how much"
                />
              </div>
            </div>
          </>
        }

        {amount !== '' && 
          <button className="button" type="submit">update</button>
        }

      </form>
    )
  }
}

export default EditTransactionForm

