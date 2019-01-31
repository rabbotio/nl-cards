import React, { Component } from 'react'
import './App.css'

import Card from './components/Card'
import QuestionFactory from './factory/QuestionFactory'
import AnswerFactory from './factory/AnswerFactory'
import terms from './datas/ml/terms.json'

class App extends Component {
  render () {
    const term = terms[3] // terms[Math.floor(terms.length * Math.random())]
    const front = QuestionFactory.term({
      topic: term.topic
    })
    const back = AnswerFactory.math({
      desc: term.desc,
      math: term.math,
      bullets: term.bullets
    })

    return (
      <div className='App'>
        <Card front={front} back={back} />
      </div>
    )
  }
}

export default App
