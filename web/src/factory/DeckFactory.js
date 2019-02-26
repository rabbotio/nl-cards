import { getJSON } from '@rabbotio/fetcher'

function parseDeck (cardDatas) {
  const getNextId = index => (index < cardDatas.length - 1 ? `TASK.${index + 1}` : 'END')

  const deckObject = {}
  cardDatas.forEach(({ text, img }, index) => {
    const askId = `TASK.${index}`
    const noId = `TASK.${index}.1`
    const revealId = `TASK.${index}.2`

    const yesId = `TASK.${index}.3`
    const nextId = getNextId(index)

    deckObject[askId] = {
      uid: '0',
      msgs: [`Remember <b>${text}</b>?`],
      replies: [
        {
          label: 'No...',
          value: JSON.stringify({ ans: 'no', index }),
          jump: noId
        },
        {
          label: 'Yes!',
          value: JSON.stringify({ ans: 'yes', index }),
          jump: yesId
        }
      ]
    }

    deckObject[noId] = {
      uid: '0',
      msgs: [`That's OK! See below for answer`],
      jump: revealId
    }

    deckObject[revealId] = {
      uid: '0',
      msgs: [index < cardDatas.length - 1 ? `Let's continue!` : `That's it!`],
      imgs: [img],
      jump: nextId
    }

    deckObject[yesId] = {
      uid: '0',
      msgs: [`Cool!`],
      jump: nextId
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
