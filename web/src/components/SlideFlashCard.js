import React, { useState, useContext } from 'react'
import FlashCard from './FlashCard'
import QuickReplyButtonList from './QuickReplyButtonList'
import { FlashCardContext } from './FlashCardContext'

import styled from 'styled-components'

const FlashCardList = styled.div`
  display: flex;
  flex-direction: row;
  height: 320px;
  width: 512px;
  overflow: scroll;
  align-content: center;
  padding: 8px;

  div {
    margin-right: 4px;
  }
`

function SlideFlashCard ({ datas, index = 0 }) {
  const [count, setCount] = useState(index)
  const [reveal, setReveal] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { next, retry } = useContext(FlashCardContext)

  const quickReplyButtons = [
    {
      title: 'What?',
      onClick: () => {
        setDisabled(true)
        retry()
        setReveal(!reveal)
        setDisabled(false)
      },
      disabled
    },
    {
      title: `Next`,
      onClick: () => {
        setDisabled(true)
        setReveal(false)

        new Promise(resolve => setTimeout(resolve, 500)).then(() => {
          next()
          setCount(count + 1)
          setDisabled(false)
        })
      },
      disabled
    }
  ]

  return (
    <div>
      <FlashCardList>
        <FlashCard data={datas[count]} revealed={reveal} />
        <FlashCard data={datas[count + 1]} revealed={reveal} />
        <FlashCard data={datas[count + 2]} revealed={reveal} />
      </FlashCardList>
      <QuickReplyButtonList data={quickReplyButtons} />
    </div>
  )
}

export default SlideFlashCard
