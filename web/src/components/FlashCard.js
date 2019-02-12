import React from 'react'
import Card from './Card'
import QuestionFactory from '../factory/QuestionFactory'
import AnswerFactory from '../factory/AnswerFactory'

import styled from 'styled-components'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function makeCard (data) {
  const _front = QuestionFactory.build(data[0].front)
  const _back = AnswerFactory.build(data[0].back)
  return <Card front={_front} back={_back} />
}

function FlashCard ({ data }) {
  return <CardContainer>{makeCard(data)}</CardContainer>
}

export default FlashCard
