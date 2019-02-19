function injectButtonEvent (replies, { onClick }) {
  // Guard
  if (!replies || replies.disabled) return

  // Inject
  replies.map(
    element =>
      (element.onClick = event => {
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

        // Callback
        onSubmit(event, element.goto)
      })
  )
}

export { injectButtonEvent, injectSubmitEvent }
