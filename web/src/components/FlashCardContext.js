import React from 'react'

let cards = { index: 0, loss: 0 }
export const FlashCardContext = React.createContext({
  index: cards.index,
  retry: () => {
    cards.loss++
    console.log(`retry:${cards.loss}`)
  },
  next: () => {
    cards.index++
    console.log(`index:${cards.index}`)
  }
})
