import React, { useState, useContext, useEffect } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { getChatStyle, getTypingChatData } from './RBChatStyles'

import { addController } from './RBChatController'
import DeckFactory from '../factory/DeckFactory'
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
  // const [deckDatas, setDeckDatas] = useState(getDecks(topic))
  const [email, setEmail] = useState('')
  const chatRef = React.createRef()

  const typing = async (nextId, delay = 1000) => {
    console.log('nextId:' + nextId)
    console.dir(json)
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

  useEffect(
    () => {
      if (!topic || topic === '') return
      ;(async () => {
        const nextId = await DeckFactory.build(json, topic)
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
      scrollToBottom(chatRef.current)
    },
    [chatDatas]
  )

  // Collect lost
  const callback = value => {
    if (!value) return

    const { ans, index } = JSON.parse(value)
    if (ans === 'no') user.losts.push(index)
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
