import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import auth

import 'bulma'
import './styles/style.scss'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'

import Dashboard from './components/finances/Dashboard'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)





// fetch('/api/accounts',{
//   headers: {
//     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjJ9.vdxweq5yf3ZjJmcx08bWNm9u1e8r6RQLavwPmQkP0xo'
//   }
// } )
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.log(err))