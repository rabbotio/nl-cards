import React, { Component } from 'react'
import './App.css'

import CardList from './components/CardList'
import datas from './datas/ml/terms.json'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <CardList datas={datas} />
      </div>
    )
  }
}

export default App
