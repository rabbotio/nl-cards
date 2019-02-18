import React, { useState, useContext, useEffect } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { injectButtonEvent, injectSubmitEvent } from './RBChatButtonInjector'
import { getChatStyle } from './RBChatStyles'

import all from '../datas/all.json'
import profiles from '../datas/profiles.json'

const Containerz = styled.div`
   {
    flex-flow: row;
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

const fillEmail = (msgs, value) => msgs.map(element => element.replace(/\${email}/g, value))

function RBChatContainer () {
  const [chatId, setChatId] = useState('0')
  const [chatDatas, setChatDatas] = useState([json[chatId]])
  const [email, setEmail] = useState('')

  const goto = nextId => {
    const nextChatDatas = chatDatas.concat(json[nextId])
    setChatId(nextId)
    setChatDatas(nextChatDatas)
  }
  const onClick = (event, nextId) => goto(nextId)
  const onSubmit = (event, nextId) => {
    const { value } = event.target.elements[0]

    // Confirm email
    const chatData = json[nextId]
    chatData.msgs = fillEmail(chatData.msgs, value)

    // Set state
    setEmail(value)

    // Go!
    goto(nextId)
  }

  useEffect(
    () => {
      const cmds = chatDatas[chatDatas.length - 1].cmds
      if (cmds) {
        const cmd = cmds[0]
        const action = Object.keys(cmd)[0]
        const param = cmd[action]

        switch (action) {
          case 'goto':
            const nextId = param
            const nextChatDatas = chatDatas.concat(json[nextId])
            setChatId(nextId)
            setChatDatas(nextChatDatas)
            break
        }
      }
    },
    [chatId]
  )

  // Add intercept
  const chatData = chatDatas[chatDatas.length - 1]
  if (chatData) {
    // Replace with email
    // TODO : Fix this overfitting!
    chatData.msgs && email && (chatData.msgs = fillEmail(chatData.msgs, email))

    chatData.replies && injectButtonEvent(chatData.replies, { onClick })
    chatData.inputs && injectSubmitEvent(chatData.inputs, { onSubmit })
  }

  return (
    <Containerz>
      <Chatz>
        <dl className='ios7'>
          {chatDatas.map((item, index) => (
            <Msgz key={index} {...item} />
          ))}
        </dl>
      </Chatz>
    </Containerz>
  )
}

export default RBChatContainer
