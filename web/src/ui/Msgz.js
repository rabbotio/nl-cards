import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import QuickReplyButtonList from '../components/QuickReplyButtonList'

const buildMessage = msgs => msgs.map((msg, index) => <p key={index}>{ReactHtmlParser(msg)}</p>)

export default ({ id, uid, msgs, img, replies }) => {
  return uid === '0' ? (
    <dd className='to'>
      <img alt='me' className='me' src={img} />
      {buildMessage(msgs)}
    </dd>
  ) : (
    <dd className='from'>
      <img alt='you' className='you' src={img} />
      {buildMessage(msgs)}
      <QuickReplyButtonList data={replies} />
    </dd>
  )
}
