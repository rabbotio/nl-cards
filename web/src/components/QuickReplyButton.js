import React from 'react'

function QuickReplyButton ({ title, cmd }) {
  return <button onClick={cmd}>{title}</button>
}

export default QuickReplyButton
