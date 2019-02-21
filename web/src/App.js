import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import View from './View'

import './App.css'

import styled from 'styled-components'
const Allz = styled.div`
   {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
  }
`

class App extends Component {
  render () {
    return (
      <Allz>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/view/:cid' component={View} />
        </Switch>
      </Allz>
    )
  }
}

export default App
