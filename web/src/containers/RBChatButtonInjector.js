function injectButtonEvent (replies, { onClick }) {
  // Guard
  if (!replies) return

  // Inject
  replies.map(
    element =>
      (element.onClick = event => {
        // Callback
        const { label, text, value, jump } = element
        onClick(event, { label, text, value, jump })
      })
  )
}

function injectSubmitEvent (inputs, { onSubmit }) {
  // Guard
  if (!inputs) return

  // Inject
  inputs.map(
    element =>
      (element.onSubmit = event => {
        // No refresh
        event.preventDefault()

        // Callback
        const { jump } = element
        onSubmit(event, { jump })
      })
  )
}

export { injectButtonEvent, injectSubmitEvent }
