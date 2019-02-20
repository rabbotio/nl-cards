import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import RBChatInput from '../components/RBChatInput'
import styled from 'styled-components'

const Imagez = styled.img`
   {
    display: flex;
    width: 320px;
    height: auto;
  }
`

const buildMessage = msgs => msgs && msgs.map((msg, index) => <p key={index}>{ReactHtmlParser(msg)}</p>)
const buildImages = imgs => imgs && imgs.map((src, index) => <Imagez key={index} src={src} />)

const Holderz = styled.div`
   {
    padding-top: 1em;
    padding-bottom: 1em;
  }
`

export default ({ id, uid, msgs, imgs, img, replies, inputs, active }) => {
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
        {buildImages(imgs)}
        {buildMessage(msgs)}
      </dd>
      <RBChatInput replies={replies} inputs={inputs} active={active} />
    </Holderz>
  )
}
