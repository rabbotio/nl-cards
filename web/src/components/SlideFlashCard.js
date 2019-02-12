import React, { useContext } from 'react'
import FlashCard from './FlashCard'
import QuickReplyButtonList from './QuickReplyButtonList'
import { FlashCardContext } from './FlashCardContext'

function SlideFlashCard ({ datas, index = 0 }) {
  // const [count, setCount] = useState(index)
  const { next, retry } = useContext(FlashCardContext)

  const quickReplyButtons = [
    {
      title: 'What?',
      cmd: retry
    },
    {
      title: `Next`,
      cmd: next
    }
  ]

  return (
    <div>
      <FlashCard data={datas[index]} />
      <QuickReplyButtonList data={quickReplyButtons} />
    </div>
  )
}

export default SlideFlashCard
