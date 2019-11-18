import React from 'react'

class NewAccountForm extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      account: {
        name: '',
        bank: '',
        current_balance: null,
        is_main_account: true,
        last_balance_update: null, 
        description: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const account = { ...this.state.account, [name]: value }
    this.setState({ account })
  }

  render() {
    console.log('new account state', this.state)
    console.log('new account props', this.props)
    const { name, bank, current_balance } = this.state.account
    return (
      <form className="manage-account-form"
        onSubmit={(e) => {
          e.preventDefault()
          this.props.handleNewAccount(this.state.account)
        }}>
        <div className="form-field">
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="account name"
              onChange={this.handleChange}
              value={name}
            />
          </div>
        </div>

        <div className="form-field">
          <div className="control">
            <input
              className="input"
              type="text"
              name="bank"
              placeholder="bank"
              onChange={this.handleChange}
              value={bank}
            />
          </div>
        </div>

        <i className="fas fa-pound-sign form-field"></i>
        <div className="form-field money-field">
          <div className="control">
            <input
              className="input"
              name="current_balance"
              type="number"
              value={current_balance}
              onChange={this.handleChange}
              placeholder="balance"
            />
          </div>
        </div>
        <button className="button" type="submit">create</button>

      </form>
    )
  }

}

export default NewAccountForm