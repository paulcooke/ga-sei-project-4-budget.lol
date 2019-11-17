import React from 'react'
// may need to import link from react-router-dom

const AccountsList = ({ accounts, handleSelectAccount, selectedAccountId }) => (
  <ul>
    { 
      accounts.map(account => {
        return <li key={account.id} className="accounts-list">
          {account.id !== selectedAccountId &&
            <div className="account-details" value={account.id} onClick={handleSelectAccount}>Select this account</div>
          }
          {account.id === selectedAccountId &&
            <>
              <i className="far fa-check-circle"></i><span> <strong>Selected: </strong></span>
            </>
          }
          <div className="account-details">{account.name}{account.bank && <span>, {account.bank}</span>}</div>
        </li>
      })
    }
  </ul>
)

export default AccountsList