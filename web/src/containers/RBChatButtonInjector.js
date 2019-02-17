function injectButtonEvent (json, chatData, { next, setChatDatas }) {
  const replies = chatData.replies
  if (replies) {
    replies.map(
      button =>
        (button.onClick = () => {
          // Init
          const pastText = chatData
          const nextId = button.nextId
          const nextText = json[nextId]

          // Next
          next(nextId)

          // Remove buttons
          delete pastText.replies

          // Present
          setChatDatas([pastText, nextText])
        })
    )
  }
}

export { injectButtonEvent }
