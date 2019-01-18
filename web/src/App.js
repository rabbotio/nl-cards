import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import QuestionFactory from './factory/QuestionFactory'
import AnswerFactory from './factory/AnswerFactory';

class App extends Component {
  render() {
    const front = QuestionFactory.term('Recall')
    const back = AnswerFactory.term(
      '\\text{Recall} = \\frac{\\text{True Positives}} {\\text{True Positives} + \\text{False Negatives}}',
      'A metric for classification models that answers the following question: Out of all the possible positive labels, how many did the model correctly identify?'
    )

    return (
      <div className="App">
        <Card front={front} back={back} />
      </div>
    )
  }
}

export default App;
