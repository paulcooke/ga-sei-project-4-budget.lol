/* eslint-disable camelcase */
import React from 'react'
// may need to import link from react-router-dom

class ManageAccounts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      account: {
        name: '',
        bank: '',
        current_balance: null,
        is_main_account: true,
        last_balance_update: null
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const account = {
      name: this.props.name,
      bank: this.props.bank,
      current_balance: this.props.current_balance,
      is_main_account: this.props.is_main_account,
      last_balance_update: this.props.last_balance_update
    }
    this.setState({ account: account })
  }

  handleChange({ target: { name, value } }) {
    const account = { ...this.state.account, [name]: value }
    this.setState({ account })
  }


  // console.log('account props', this.props)
  // console.log('account state', this.state)
  render() {
    const { current_balance, name, bank } = this.state.account
    return (
      <>
        <div><strong>{name}</strong>{bank && <span>, {bank}</span>}</div>
        <form className="manage-account-form"
          onSubmit={(e) => {
            e.preventDefault()
            this.props.handleUpdateAccount(this.state.account)
          }}>
          <i className="fas fa-pound-sign form-field"></i>
          <div className="form-field money-field">
            <div className="control">
              <input
                className="input"
                name="current_balance"
                type="float"
                value={current_balance}
                onChange={this.handleChange}
                placeholder="amt"
              />
            </div>
          </div>
          <button className="button" type="submit">update</button>
        </form>
        <small><i className="fas fa-exclamation-circle"></i> for the best experience always update your current balance as it is today</small>
      </>
    )
  }
}


export default ManageAccounts