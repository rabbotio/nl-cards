import React, { Suspense } from 'react'
// import GameComponent from '../components/GameComponent'

export default class GameFactory {
  static async build (json, topic, source) {
    if (!topic || topic === '') return
    if (!source || source === '') return

    const GameComponent = React.lazy(() => import(`../games/${topic}/${source}`))

    // TODO : generate from index.js
    const gameData = {
      'GAME.0': {
        uid: '0',
        msgs: [
          'How <b>"Precision"</b> is this?',
          <Suspense fallback={<span>loading...</span>}>
            <GameComponent />
          </Suspense>
        ],
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
