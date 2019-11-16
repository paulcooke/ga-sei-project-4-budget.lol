import React from 'react'
import axios from 'axios'


// import Auth from '../../lib/auth'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      accounts: []
    }
  }


  render() {
    return (
      <section className="section">
        <div className="columns is-centered">
          <h1>this is the dashboard page</h1>
        </div>
      </section> 
    )
  }

}

export default Dashboard