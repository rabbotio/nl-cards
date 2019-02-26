import React, { Component } from 'react'
import Card from './components/Card'
import QuestionFactory from './factory/QuestionFactory'
import AnswerFactory from './factory/AnswerFactory'

// import google_crash_course from './datas/ml/google_crash_course.json'
import accenture from './datas/ml/accenture.json'

class View extends Component {
  render () {
    const cid = parseInt(this.props.match.params.cid)
    const { front, back } = accenture[cid]
    const _front = QuestionFactory.build(front)
    const _back = AnswerFactory.build(back)
    return <Card front={_front} back={_back} />
  }
}

export default View
