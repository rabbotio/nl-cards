import React, { Component } from 'react'
import './App.css'

import datas from './datas/ml/terms.json'
import SlideFlashCard from './components/SlideFlashCard'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SlideFlashCard datas={datas} />
      </div>
    )
  }
}

export default App
