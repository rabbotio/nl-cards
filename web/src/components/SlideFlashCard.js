import React from 'react'
import FlashCard from './FlashCard'
import QuickReplyButtonList from './QuickReplyButtonList'
import { FlashCardContext } from './FlashCardContext'

function SlideFlashCard ({ data }) {
  return (
    <FlashCardContext.Consumer>
      {({ next, retry }) => (
        <div>
          <FlashCard data={data} />
          <QuickReplyButtonList
            data={[
              {
                title: 'What?',
                cmd: retry
              },
              {
                title: `Next`,
                cmd: next
              }
            ]}
          />
        </div>
      )}
    </FlashCardContext.Consumer>
  )
}

export default SlideFlashCard
