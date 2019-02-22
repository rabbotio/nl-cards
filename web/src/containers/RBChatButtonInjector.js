function injectButtonEvent (replies, { onClick }) {
  // Guard
  if (!replies) return

  // Inject
  replies.map(
    element =>
      (element.onClick = event => {
        // Callback
        const { label, text, nextId } = element
        onClick(event, { label, text, nextId })
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
        const { nextId } = element
        onSubmit(event, { nextId })
      })
  )
}

export { injectButtonEvent, injectSubmitEvent }
