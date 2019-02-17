function injectButtonEvent (replies, { onClick }) {
  if (replies && Array.isArray(replies)) {
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
}

export { injectButtonEvent }
