import React, { useState, useContext } from 'react'
import FlashCard from './FlashCard'
import QuickReplyButtonList from './QuickReplyButtonList'
import { FlashCardContext } from './FlashCardContext'

function SlideFlashCard ({ datas, index = 0 }) {
  const [count, setCount] = useState(index)
  const [disabled, setDisabled] = useState(false)
  const { next, retry } = useContext(FlashCardContext)

  const quickReplyButtons = [
    {
      title: 'What?',
      onClick: () => {
        retry()
      },
      disabled
    },
    {
      title: `Next`,
      onClick: button => {
        setDisabled(true)
        next()
        setCount(count + 1)
        setDisabled(false)
      },
      disabled
    }
  ]

  return (
    <div>
      <FlashCard data={datas[count]} />
      <QuickReplyButtonList data={quickReplyButtons} />
    </div>
  )
}

export default SlideFlashCard
