import React from 'react'
import QuickReplyButtonList from '../components/QuickReplyButtonList'

function RBChatInput ({ replies, inputs }) {
  if (replies && replies[0]) {
    return <QuickReplyButtonList data={replies} />
  }

  if (inputs && inputs[0]) {
    // TODO : support multipled inputs
    const input = inputs[0]
    const onSubmit = input.onSubmit
    switch (input.type) {
      case 'email':
        return (
          <form onSubmit={onSubmit}>
            <input type='email' defaultValue='x@x.com' />
            <input type='submit' />
          </form>
        )
    }
  }

  return null
}

export default RBChatInput
