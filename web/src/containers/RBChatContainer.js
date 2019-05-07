import React, { useState, useContext, useEffect, useRef } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { getChatStyle, getTypingChatData } from './RBChatStyles'

import { addController } from './RBChatController'
// import DeckFactory from '../factory/DeckFactory'
import GameFactory from '../factory/GameFactory'
import { applyProfile, initProfile, getProfile } from './RBChatProfile'

const Containerz = styled.div`
   {
    flex-flow: row;
    max-height: 460px;
    overflow-y: auto;
    width: 480px;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    ::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
  }
`

const Chatz = getChatStyle('#3498db', '#ecf0f1')
const json = initProfile()

const UserContext = React.createContext({
  context: 'NEW',
  profile: getProfile(),
  losts: []
})

const scrollToBottom = ref => setTimeout(() => ref.scrollIntoView({ block: 'end', behavior: 'smooth' }), 100)

function RBChatContainer () {
  const user = useContext(UserContext)
  const [chatId, setChatId] = useState('INIT')
  const [nextId, setNextId] = useState('')
  const [typeAndJumpId, setTypeAndJumpId] = useState('')
  const [chatDatas, setChatDatas] = useState([json[chatId]])
  const [topic, setTopic] = useState('')
  const [source, setSource] = useState('')

  // const [deckDatas, setDeckDatas] = useState(getDecks(topic))
  const [email, setEmail] = useState('')
  const chatRef = useRef(null)

  const goto = async nextId => {
    const nextChatData = Object.assign({}, json[nextId])

    const nextChatDatas = chatDatas.concat(nextChatData)
    setChatId(nextId)

    // Capped
    const _nextChatDatas = nextChatDatas.slice(nextChatDatas.length - 16, nextChatDatas.length)
    setChatDatas(_nextChatDatas)

    const delay = parseInt(nextChatData.typing)
    if (delay > 0) {
      return new Promise(_ => setTimeout(_, delay)).then(() => goto(nextChatData.jump))
    }

    return nextId
  }

  useEffect(
    () => {
      if (!nextId || nextId === '') return
      goto(nextId)
    },
    [nextId]
  )

  useEffect(
    () => {
      if (!typeAndJumpId || typeAndJumpId === '') return

      // Will add typing msg
      const { uid, name, img } = json[typeAndJumpId]

      const typingChatData = getTypingChatData({ uid, name, img, jump: typeAndJumpId })
      const typingId = '_typing_' + typeAndJumpId
      json[typingId] = typingChatData

      setNextId(typingId)
    },
    [typeAndJumpId]
  )

  useEffect(
    () => {
      if (!topic || topic === '') return
      ;(async () => {
        const nextId = await GameFactory.build(json, topic, source)
        applyProfile(json)
        setTypeAndJumpId(nextId)
      })()
    },
    [topic, source]
  )

  useEffect(
    () => {
      // Play deck?
      const currentChatData = chatDatas[chatDatas.length - 1]
      const { game, deck, jump } = currentChatData

      if (game) {
        // eslint-disable-next-line
        const [_topic, _game] = game.split('/')
        setSource(_game)
        setTopic(_topic)
        return
      }

      if (deck) {
        // eslint-disable-next-line
        const [_, _topic, _source] = deck.split('/')
        setSource(_source)
        setTopic(_topic)
        return
      }

      // Jump?
      if (jump) {
        setTypeAndJumpId(jump)
        return
      }

      // Scroll to bottom
      scrollToBottom(chatRef.current)
    },
    [chatDatas]
  )

  // Collect lost
  const callback = value => {
    switch (user.context) {
      case 'CONFIRM_EMAIL':
        // Do something?
        break
      default:
        console.log('callback:', value)
        const { valid, ans } = JSON.parse(value)
        if (valid !== 'OK') user.losts.push(ans)
        break
    }
  }

  // Add input events mostly
  addController(user, { setTopic, setEmail, json, goto, email, chatDatas, callback })

  return (
    <Containerz>
      <Chatz ref={chatRef}>
        {chatDatas.map((item, index) => (
          <Msgz key={index} {...item} />
        ))}
      </Chatz>
    </Containerz>
  )
}

export default RBChatContainer
