import React from 'react'
import Precision from '../games/ml/Precision'
import GameComponent from '../games/GameComponent'

const getReplies = answers =>
  answers.map((ans, index) => {
    return {
      label: ans,
      value: JSON.stringify({ ans, index, valid: index === 0 ? 'ΟΚ' : 'OK' }),
      jump: 'QUEST_END'
    }
  })

export default class GameFactory {
  static async build (json, topic, source) {
    if (!topic || topic === '') return
    if (!source || source === '') return

    // TODO : source -> Precision, Recall, Accuracy, F1
    const { datas, selections, answers } = Precision.build()
    const replies = getReplies(answers)

    const gameData = {
      'GAME.0': {
        uid: '0',
        msgs: [`How <b>"${source}"</b> is this?`, <GameComponent datas={datas} selections={selections} />],
        replies
      }
    }

    const nextId = Object.keys(gameData)[0]
    Object.assign(json, gameData)
    return nextId
  }
}
