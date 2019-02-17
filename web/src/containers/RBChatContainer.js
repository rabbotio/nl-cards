import React, { useState, useContext } from 'react'
import { RBChatContext } from './RBChatContext'
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
    msgs: [`We only have <b>ML</b> for <b>MVP</b>`, `Wanna try?`],
    replies: [{ title: '✓ Yes!', nextId: '1' }, { title: '✗ No...', nextId: '2' }]
  },
  '1': {
    uid: '123',
    name: 'you',
    img: './img/foo.png',
    msgs: [`Yes!`]
  },
  '2': {
    uid: '123',
    name: 'you',
    img: './img/foo.png',
    msgs: [`No...`]
  }
}

function RBChatContainer () {
  const { chatId, next } = useContext(RBChatContext)
  const [chatDatas, setChatDatas] = useState([json['0']])

  // Add function
  const chatData = chatDatas[chatId]
  injectButtonEvent(json, chatData, { next, setChatDatas })

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
