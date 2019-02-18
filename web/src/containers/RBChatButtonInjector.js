import React from 'react'

function injectButtonEvent (replies, { onClick }) {
  // Guard
  if (!replies || !Array.isArray(replies)) return

  // Inject
  replies.map(
    button =>
      (button.onClick = () => {
        // Remove buttons
        replies.length = 0

        // Callback
        onClick(button.goto)
      })
  )
}

function injectSubmitEvent (inputs, { onSubmit }) {
  // Guard
  if (!inputs || !Array.isArray(inputs)) return

  // Inject
  inputs.map(
    button =>
      (button.onSubmit = event => {
        // No refresh
        event.preventDefault()

        // Remove inputs
        inputs.length = 0

        // Callback
        onSubmit(event)
      })
  )
}

export { injectButtonEvent, injectSubmitEvent }
