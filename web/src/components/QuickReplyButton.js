import React from 'react'

function QuickReplyButton ({ title, onClick, disabled }) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {title}
    </button>
  )
}

export default QuickReplyButton
