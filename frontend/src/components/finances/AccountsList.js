import React from 'react'
// may need to import link from react-router-dom

const AccountsList = ({ accounts }) => (
  <ul>
    { 
      accounts.map(account => {
        return <li key={account.id} className="accounts-list">
          <i className="far fa-check-circle"></i><span> <strong>Selected: </strong></span>
          <div className="account-details">{account.name}{account.bank && <span>, {account.bank}</span>}</div>
        </li>
      })
    }
  </ul>
)

export default AccountsList