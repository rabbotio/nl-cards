import React, { useState, useContext, useEffect } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { getChatStyle, getTypingChatData } from './RBChatStyles'

import { addController } from './RBChatController'
import DeckFactory from '../factory/DeckFactory'
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
  const [chatDatas, setChatDatas] = useState([json[chatId]])
  const [topic, setTopic] = useState('')
  const [source, setSource] = useState('')

  // const [deckDatas, setDeckDatas] = useState(getDecks(topic))
  const [email, setEmail] = useState('')
  const chatRef = React.createRef()

  const typing = async (nextId, delay = 1000) => {
    const { uid, name, img } = json[nextId]

    const typingChatData = getTypingChatData({ uid, name, img })
    const typingChatDatas = chatDatas.concat(typingChatData)
    setChatDatas(typingChatDatas)

    return new Promise(r => setTimeout(r, delay))
  }

  const goto = async nextId => {
    const nextChatData = Object.assign({}, json[nextId])
    const nextChatDatas = chatDatas.concat(nextChatData)
    setChatId(nextId)

    // Capped
    const _nextChatDatas = nextChatDatas.slice(nextChatDatas.length - 16, nextChatDatas.length)
    setChatDatas(_nextChatDatas)

    return nextId
  }

  /* TODO : Revisit Deck
  useEffect(
    () => {
      if (!topic || topic === '') return
      ;(async () => {
        const nextId = await DeckFactory.build(json, topic, source)
        applyProfile(json)
        typing(nextId).then(() => goto(nextId))
      })()
    },
    [topic]
  )
  */

  useEffect(
    () => {
      if (!topic || topic === '') return
      ;(async () => {
        const nextId = await GameFactory.build(json, topic, source)
        applyProfile(json)
        typing(nextId).then(() => goto(nextId))
      })()
    },
    [topic]
  )

  useEffect(
    () => {
      // Play deck?
      const currentChatData = chatDatas[chatDatas.length - 1]
      const { game, deck, jump } = currentChatData

      if (game) {
        // eslint-disable-next-line
        const [_topic, _game] = game.split('/')
        console.log(_topic, _game)
        setSource(_game)
        setTopic(_topic)
        return
      }

      if (deck) {
        // eslint-disable-next-line
        const [_, _topic, _source] = deck.split('/')
        console.log(_topic, _source)
        setSource(_source)
        setTopic(_topic)
        return
      }

      // Jump?
      if (jump) {
        typing(jump).then(() => goto(jump))
        return
      }

      // Scroll to bottom
      scrollToBottom(chatRef.current)
    },
    [chatDatas]
  )

  // Collect lost
  const callback = (value, type = 'CHOICE') => {
    switch (type) {
      case 'CARD':
        const { ans, index } = JSON.parse(value)
        if (ans === 'no') user.losts.push(index)
        break
      case 'CHOICE':
        // TODO : Validate choice
        console.log(`'CHOICE':` + value)
        const { valid } = JSON.parse(value)
        console.log(`valid:` + valid)
        if (valid !== 'OK') user.losts.push(index)
        console.log(`'user.losts':` + user.losts)

        break
      default:
        throw new Error('Required type')
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
