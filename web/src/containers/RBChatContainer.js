import React, { useState, useContext, useEffect } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { getChatStyle, getTypingChatData } from './RBChatStyles'

import all from '../datas/all.json'
import profiles from '../datas/profiles.json'
import { addController } from './RBChatController'
import { getJSON } from '@rabbotio/fetcher'
import { parseDeck } from '../factory/RBCardParser'

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
const json = {}

// Merge chat & profiles
const applyProfile = source => {
  for (let key in source) {
    const element = source[key]
    const profile = profiles[element.uid]
    json[key] = Object.assign({}, element, profile)
  }
}

applyProfile(all)

const UserContext = React.createContext({
  profile: profiles['1']
})

// TODO
const loadDeck = async deckUri => {
  if (!deckUri || deckUri === '') return
  const decks = await getJSON(deckUri).catch(console.error)
  return parseDeck(decks)
}

// TODO : async
const getDecks = topic => parseDeck({})

function RBChatContainer () {
  const user = useContext(UserContext)
  const [chatId, setChatId] = useState('0')
  const [chatDatas, setChatDatas] = useState([json[chatId]])

  const [topic, setTopic] = useState('')
  // const [deckDatas, setDeckDatas] = useState(getDecks(topic))

  const [email, setEmail] = useState('')

  const chatRef = React.createRef()
  const scrollToBottom = () => {
    // Delay a bit...bug?
    const _f = chatRef.current
    setTimeout(() => _f.scrollIntoView({ block: 'end', behavior: 'smooth' }), 100)
  }

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
    const _nextChatDatas = nextChatDatas.slice(nextChatDatas.length - 10, nextChatDatas.length)
    setChatDatas(_nextChatDatas)

    return nextId
  }

  useEffect(
    () => {
      if (!topic || topic === '') return
      ;(async () => {
        const _topicChatData = await loadDeck(`/${topic}/deck.json`)
        const nextId = Object.keys(_topicChatData)[0]

        Object.assign(json, _topicChatData)
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
      const { deck, jump } = currentChatData

      if (deck) {
        const _topic = deck.split('/')[1]
        setTopic(_topic)
        return
      }

      // Jump?
      if (jump) {
        typing(jump).then(() => goto(jump))
        return
      }

      // Scroll to bottom
      scrollToBottom()
    },
    [chatDatas]
  )

  // Add input events mostly
  addController(user, { setEmail, json, goto, email, chatDatas })

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
