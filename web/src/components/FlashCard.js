import React from 'react'
import Card from './Card'
import QuestionFactory from '../factory/QuestionFactory'
import AnswerFactory from '../factory/AnswerFactory'

import styled from 'styled-components'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function makeCard ({ front, back }, revealed) {
  const _front = QuestionFactory.build(front)
  const _back = AnswerFactory.build(back)
  return <Card front={_front} back={_back} revealed={revealed} />
}

function FlashCard ({ data, revealed }) {
  return <CardContainer>{makeCard(data, revealed)}</CardContainer>
}

export default FlashCard
