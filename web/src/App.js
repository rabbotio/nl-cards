import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Editor from './Editor'

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
          <Route path='/editor/:cid' component={Editor} />
        </Switch>
      </Allz>
    )
  }
}

export default App
