import React, { useState, useContext, useEffect } from 'react'
import Msgz from '../ui/Msgz'
import styled from 'styled-components'
import { injectButtonEvent } from './RBChatButtonInjector'
import { getChatStyle } from './RBChatStyles'

const Containerz = styled.div`
   {
    flex-flow: row;
  }
`

const Chatz = getChatStyle('#3498db', '#ecf0f1')

const json = {
  '0': {
    name: 'kat',
    img: './img/kat.png',
    msgs: [`For <b>MVP</b> we only have <b>ML</b>`, `Wanna try?`],
    replies: [{ title: '✓ Yes!', goto: '3' }, { title: '✗ No...', goto: '1' }]
  },
  '1': {
    uid: '123',
    name: 'you',
    img: './img/duck.png',
    msgs: [`No...`],
    cmds: [{ goto: '2' }]
  },
  '2': {
    name: 'kat',
    img: './img/kat.png',
    msgs: [`Awww...`, `Maybe later then`]
  },
  '3': {
    uid: '123',
    name: 'you',
    img: './img/duck.png',
    msgs: [`Yes!`]
  },
  '4': {
    name: 'kat',
    img: './img/kat.png',
    msgs: [`What is the difference between probability and likelihood?`, `Know answer?`],
    replies: [{ title: '✓ Yes!', goto: '7' }, { title: '✗ No...', goto: '5' }]
  }
}

function RBChatContainer () {
  const [chatId, setChatId] = useState('0')
  const [chatDatas, setChatDatas] = useState([json[chatId]])

  const onClick = nextId => {
    const nextChatDatas = chatDatas.concat(json[nextId])
    setChatId(nextId)
    setChatDatas(nextChatDatas)
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
            const nextChatDatas = chatDatas.concat(json[param])
            setChatDatas(nextChatDatas)
            break
        }
      }
    },
    [chatDatas]
  )

  // Add function
  const chatData = chatDatas[chatId]
  injectButtonEvent(chatData.replies, { onClick })

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
