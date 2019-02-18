function injectButtonEvent (replies, { onClick }) {
  // Guard
  if (!replies || replies.disabled) return

  // Inject
  replies.map(
    element =>
      (element.onClick = event => {
        // Remove buttons
        // replies.length = 0
        replies.disabled = true

        // Callback
        onClick(event, element.goto)
      })
  )
}

function injectSubmitEvent (inputs, { onSubmit }) {
  // Guard
  if (!inputs || inputs.disabled) return

  // Inject
  inputs.map(
    element =>
      (element.onSubmit = event => {
        // No refresh
        event.preventDefault()

        // Remove inputs
        // inputs.length = 0
        inputs.disabled = true

        // Callback
        onSubmit(event, element.goto)
      })
  )
}

export { injectButtonEvent, injectSubmitEvent }
