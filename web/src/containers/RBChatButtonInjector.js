import React from 'react'

function injectButtonEvent (replies, { onClick }) {
  // Guard
  if (!replies || !Array.isArray(replies)) return

  // Inject
  replies.map(
    element =>
      (element.onClick = event => {
        // Remove buttons
        replies.length = 0

        // Callback
        onClick(event, element.goto)
      })
  )
}

function injectSubmitEvent (inputs, { onSubmit }) {
  // Guard
  if (!inputs || !Array.isArray(inputs)) return

  // Inject
  inputs.map(
    element =>
      (element.onSubmit = event => {
        // No refresh
        event.preventDefault()

        // Remove inputs
        inputs.length = 0

        // Callback
        onSubmit(event, element.goto)
      })
  )
}

export { injectButtonEvent, injectSubmitEvent }
