import React, { Component } from 'react'
import './App.css'

import data from './datas/ml/terms.json'
import SlideFlashCard from './components/SlideFlashCard'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SlideFlashCard data={data} />
      </div>
    )
  }
}

export default App
