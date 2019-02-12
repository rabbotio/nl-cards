import React, { useState, useEffect } from 'react'

function QuickReplyButton ({ title, cmd }) {
  return (
    <button
      onClick={() => {
        // CMD
        cmd()

        // Effect
        // TODO : disabled button while loading
      }}
    >
      {title}
    </button>
  )
}

export default QuickReplyButton
