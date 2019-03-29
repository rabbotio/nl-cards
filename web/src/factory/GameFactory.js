import React from 'react'
import Precision from '../games/ml/Precision'
import GameComponent from '../games/GameComponent'

export default class GameFactory {
  static async build (json, topic, source) {
    if (!topic || topic === '') return
    if (!source || source === '') return

    const { datas, selections, answers } = Precision.build()

    // TODO : generate from index.js
    const gameData = {
      'GAME.0': {
        uid: '0',
        msgs: ['How <b>"Precision"</b> is this?', <GameComponent datas={datas} selections={selections} />],
        replies: [
          {
            label: '0.2',
            jump: 'END'
          },
          {
            label: '0.5',
            jump: 'END'
          },
          {
            label: '0.7',
            jump: 'END'
          },
          {
            label: '1.0',
            jump: 'END'
          }
        ]
      }
    }

    const nextId = Object.keys(gameData)[0]
    Object.assign(json, gameData)
    return nextId
  }
}
