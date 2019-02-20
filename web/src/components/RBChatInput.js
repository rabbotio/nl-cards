import React from 'react'
import QuickReplyButtonList from '../components/QuickReplyButtonList'
import { Formz } from '../ui/Formz'

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
          <Formz onSubmit={onSubmit}>
            <input type='email' defaultValue='x@x.com' autoFocus />
            <input type='submit' />
          </Formz>
        )
      default:
        console.log('N/A')
        break
    }
  }

  return null
}

export default RBChatInput
