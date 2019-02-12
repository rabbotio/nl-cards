import React, { Component } from 'react'
import './App.css'

import CardList from './components/CardList'
import data from './datas/ml/terms.json'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <CardList data={data} />
      </div>
    )
  }
}

export default App
