import React from 'react'

let chat = { id: '0' }
export const RBChatContext = React.createContext({
  chatId: chat.id,
  next: nextId => {
    console.log(`${chat.id} -> ${nextId}`)
    chat.id = nextId
  }
})
