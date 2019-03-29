import React from 'react'
import Precision from '../games/ml/Precision'
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

    // TODO : source -> Precision, Recall, Accuracy, F1
    const { datas, selections, answers, how, solution } = Precision.build()
    let replies = getReplies(answers)
    replies = _.shuffle(replies)

    const gameData = {
      'GAME.START': {
        uid: '0',
        msgs: [`How <b>"${source}"</b> is this?`, <GameComponent datas={datas} selections={selections} />],
        replies
      }
    }
    console.log(123)
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
