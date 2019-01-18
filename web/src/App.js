import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import QuestionFactory from './factory/QuestionFactory'
import AnswerFactory from './factory/AnswerFactory';
import terms from './datas/ml/terms.json'

class App extends Component {
  render() {
    const front = QuestionFactory.term('Recall')
    console.log(terms[0])
    const back = AnswerFactory.math(terms[0])

    return (
      <div className="App">
        <Card front={front} back={back} />
      </div>
    )
  }
}

export default App;
