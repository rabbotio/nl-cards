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

function RBChatContainer () {
  const [chatId, setChatId] = useState('0')
  const [chatDatas, setChatDatas] = useState([json[chatId]])

  const onClick = nextId => {
    const nextChatDatas = chatDatas.concat(json[nextId])
    setChatId(nextId)
    setChatDatas(nextChatDatas)
  }

  const onSubmit = event => {
    console.log(event.target.elements[0].value)
    // TODO : confirm email
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
