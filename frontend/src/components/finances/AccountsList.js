import React from 'react'
// may need to import link from react-router-dom

const AccountsList = ({ accounts }) => (
  <ul>
    { 
      accounts.map(account => {
        return <li key={account.id}>{account.name}{account.bank && <span>, {account.bank}</span>}</li>
      })
    }
  </ul>
)

export default AccountsList