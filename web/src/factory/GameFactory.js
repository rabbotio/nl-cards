import React from 'react'
import PRAF1 from '../games/ml/PRAF1'
import GameComponent from '../games/GameComponent'
import _ from 'lodash'

const getReplies = answers =>
  answers.map((ans, index) => {
    return {
      label: ans,
      value: JSON.stringify({ ans, valid: index === 0 ? 'OK' : 'ΟΚ' }),
      jump: 'QUEST_END'
    }
  })

export default class GameFactory {
  static async build (json, topic, source) {
    if (!topic || topic === '') return
    if (!source || source === '') return

    console.dir(`${topic}/${source}`)

    // TODO : source -> Accuracy, F1

    // Load game
    const Precision = await import('../games/ml/Precision')
    const Recall = await import('../games/ml/Recall')
    const GAMES = { Precision, Recall }
    const generator = GAMES[source].generator

    // Build game
    const { datas, selections, answers, how, solution } = PRAF1.build(generator)
    let replies = getReplies(answers)
    replies = _.shuffle(replies)

    const gameData = {
      'GAME.START': {
        uid: '0',
        msgs: [`How <b>"${source}"</b> is this?`, <GameComponent datas={datas} selections={selections} />],
        replies
      }
    }

    // Hint
    gameData['GAME.START'].replies.push({
      label: 'HINT',
      value: JSON.stringify({ valid: 'HINT' }),
      jump: 'GAME.HINT'
    })

    gameData['GAME.HINT'] = {
      uid: '0',
      msgs: [how, solution],
      jump: 'GAME.START'
    }

    const nextId = Object.keys(gameData)[0]
    Object.assign(json, gameData)
    return nextId
  }
}
