function parseDeck (cardURIs) {
  const getNextId = index => (index < cardURIs.length - 1 ? `1.${index + 1}` : '2')

  const deckObject = {}
  cardURIs.forEach((uri, index) => {
    deckObject[`1.${index}`] = {
      uid: '0',
      imgs: [uri],
      msgs: ['Remember this?'],
      replies: [
        {
          label: 'No...',
          value: 0,
          nextId: getNextId(index)
        },
        {
          label: 'Yes!',
          value: 1,
          nextId: getNextId(index)
        }
      ]
    }
  })

  return deckObject
}

export { parseDeck }
