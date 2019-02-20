import React, { useState, useEffect } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { getChatStyle, getTypingChatData } from './RBChatStyles'

import all from '../datas/all.json'
import profiles from '../datas/profiles.json'
import { addController } from './RBChatController'

const Containerz = styled.div`
   {
    flex-flow: row;
    max-height: 460px;
    overflow-y: auto;
    width: 480px;
    overflow-x: hidden;
  }
`

const Chatz = getChatStyle('#3498db', '#ecf0f1')

// Merge chat & profiles
const json = {}
for (let key in all) {
  const element = all[key]
  const profile = profiles[element.uid]
  json[key] = Object.assign({}, element, profile)
}

function RBChatContainer () {
  const [chatId, setChatId] = useState('0')
  const [chatDatas, setChatDatas] = useState([json[chatId]])
  const [email, setEmail] = useState('')

  const chatRef = React.createRef()
  const scrollToBottom = () => {
    // Delay a bit...bug?
    const _f = chatRef.current
    setTimeout(() => _f.scrollIntoView({ block: 'end', behavior: 'smooth' }), 0)
  }

  const typing = async (nextId, delay = 1000) => {
    const { uid, name, img } = json[nextId]

    const typingChatData = getTypingChatData({ uid, name, img })
    const typingChatDatas = chatDatas.concat(typingChatData)
    setChatDatas(typingChatDatas)

    return new Promise(r => setTimeout(r, delay))
  }

  const goto = nextId => {
    const nextChatData = Object.assign({}, json[nextId])
    const nextChatDatas = chatDatas.concat(nextChatData)
    setChatId(nextId)
    setChatDatas(nextChatDatas)
  }

  useEffect(
    () => {
      // Commands
      const cmds = chatDatas[chatDatas.length - 1].cmds
      cmds &&
        cmds.forEach(cmd => {
          const action = Object.keys(cmd)[0]
          const param = cmd[action]

          switch (action) {
            case 'goto':
              const nextId = param
              typing(nextId).then(() => goto(nextId))
              break
            default:
              console.log('N/A')
              break
          }
        })

      // Scroll to bottom
      scrollToBottom()
    },
    [chatDatas]
  )

  // Add input events mostly
  addController({ setEmail, json, goto, email, chatDatas })

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
