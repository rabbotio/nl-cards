import React, { useState, useContext } from 'react'
import FlashCard from './FlashCard'
import QuickReplyButtonList from './QuickReplyButtonList'
import { FlashCardContext } from './FlashCardContext'

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
        next()
        setCount(count + 1)
        setDisabled(false)
      },
      disabled
    }
  ]

  return (
    <div>
      <FlashCard data={datas[count]} revealed={reveal} />
      <QuickReplyButtonList data={quickReplyButtons} />
    </div>
  )
}

export default SlideFlashCard
