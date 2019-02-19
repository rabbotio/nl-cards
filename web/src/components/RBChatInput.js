import React from 'react'
import QuickReplyButtonList from '../components/QuickReplyButtonList'

function RBChatInput ({ replies, inputs, active }) {
  if (!active) return null

  if (replies && replies[0] && !replies.disabled) {
    return <QuickReplyButtonList data={replies} />
  }

  if (inputs && inputs[0] && !inputs.disabled) {
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
      default:
        console.log('N/A')
        break
    }
  }

  return null
}

export default RBChatInput
