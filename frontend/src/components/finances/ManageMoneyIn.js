import React from 'react'

class ManageMoneyIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transaction: {}
    }
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

  render() {
    return (
      <h1>money in innit</h1>
    )
  }

}

export default ManageMoneyIn