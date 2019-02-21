import React from 'react'
import Card from './Card'
import QuestionFactory from '../factory/QuestionFactory'
import AnswerFactory from '../factory/AnswerFactory'

import styled from 'styled-components'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function makeCard (datas) {
  return datas.map(({ front, back }, index) => {
    const _front = QuestionFactory.build(front)
    const _back = AnswerFactory.build(back)

    return <Card key={index} front={_front} back={_back} />
  })
}

function CardList ({ datas }) {
  return <CardContainer>{makeCard(datas)}</CardContainer>
}

export default CardList
