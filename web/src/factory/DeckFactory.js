import { getJSON } from '@rabbotio/fetcher'

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
          jump: getNextId(index)
        },
        {
          label: 'Yes!',
          value: 1,
          jump: getNextId(index)
        }
      ]
    }
  })

  return deckObject
}

export default class DeckFactory {
  static async build (json, topic) {
    if (!topic || topic === '') return
    const deckURI = `/${topic}/deck.json`
    const deckJSON = await getJSON(deckURI).catch(console.error)
    const deckData = parseDeck(deckJSON)
    const nextId = Object.keys(deckData)[0]

    Object.assign(json, deckData)
    return nextId
  }
}
