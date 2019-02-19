import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import RBChatInput from '../components/RBChatInput'

const buildMessage = msgs => msgs.map((msg, index) => <p key={index}>{ReactHtmlParser(msg)}</p>)

export default ({ id, uid, msgs, img, replies, inputs, active }) => {
  return uid !== '0' ? (
    <div>
      <dd className='to'>
        <img alt='me' className='me' src={img} />
        {buildMessage(msgs)}
      </dd>
    </div>
  ) : (
    <div>
      <dd className='from'>
        <img alt='you' className='you' src={img} />
        {buildMessage(msgs)}
      </dd>
      <RBChatInput replies={replies} inputs={inputs} active={active} />
    </div>
  )
}
