import React from 'react'

let chat = { id: '0' }
export const RBChatContext = React.createContext({
  chatId: chat.id,
  next: id => {
    chat.id = id
    console.log(`chat.id:${chat.id}`)
  }
})
