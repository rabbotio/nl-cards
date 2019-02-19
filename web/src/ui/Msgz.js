import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import RBChatInput from '../components/RBChatInput'
import styled from 'styled-components'

const buildMessage = msgs => msgs.map((msg, index) => <p key={index}>{ReactHtmlParser(msg)}</p>)
const Holderz = styled.div`
   {
    padding-top: 0.5em;
  }
`

export default ({ id, uid, msgs, img, replies, inputs, active }) => {
  return uid !== '0' ? (
    <Holderz>
      <dd className='to'>
        <img alt='me' className='me' src={img} />
        {buildMessage(msgs)}
      </dd>
    </Holderz>
  ) : (
    <Holderz>
      <dd className='from'>
        <img alt='you' className='you' src={img} />
        {buildMessage(msgs)}
      </dd>
      <RBChatInput replies={replies} inputs={inputs} active={active} />
    </Holderz>
  )
}
