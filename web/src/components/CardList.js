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
  return data.map(({ front, back }) => {
    const _front = QuestionFactory.build(front)
    const _back = AnswerFactory.build(back)

    return <Card front={_front} back={_back} />
  })
}

function CardList ({ data }) {
  const cards = data.forEach(({ front, back }) => {
    const _front = QuestionFactory.build(front)
    const _back = AnswerFactory.build(back)

    return <Card front={_front} back={_back} />
  })
  return <CardContainer>{makeCard(data)}</CardContainer>
}

export default CardList
