import React, { Component } from 'react'
import Card from './components/Card'
import QuestionFactory from './factory/QuestionFactory'
import AnswerFactory from './factory/AnswerFactory'

import datas from './datas/ml/terms.json'

class View extends Component {
  render () {
    const cid = parseInt(this.props.match.params.cid)
    const { front, back } = datas[cid]
    const _front = QuestionFactory.build(front)
    const _back = AnswerFactory.build(back)
    return <Card front={_front} back={_back} />
  }
}

export default View
