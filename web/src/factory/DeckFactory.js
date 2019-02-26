import { getJSON } from '@rabbotio/fetcher'

function parseDeck (cardDatas) {
  const getNextId = index => (index < cardDatas.length - 1 ? `TASK.${index + 1}` : 'END')

  const deckObject = {}
  cardDatas.forEach(({ questions, answers }, index) => {
    const askId = `TASK.${index}`
    const noId = `TASK.${index}.0`
    const revealId = `TASK.${index}.2`

    const yesId = `TASK.${index}.1`
    const nextId = getNextId(index)

    deckObject[askId] = {
      uid: '0',
      msgs: questions.concat(['Remember that?']),
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
      imgs: answers,
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
  static async build (json, topic, source) {
    if (!topic || topic === '') return
    if (!source || source === '') return

    const deckURI = `/${topic}/${source}/index.json`
    const deckJSON = await getJSON(deckURI).catch(console.error)
    console.dir(`${deckURI}:deckURI`)
    const deckData = parseDeck(deckJSON)
    const nextId = Object.keys(deckData)[0]

    Object.assign(json, deckData)
    console.dir(json)
    return nextId
  }
}
