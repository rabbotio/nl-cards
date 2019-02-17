import React from 'react'
import { Buttonz } from '../ui/Buttonz'
// import { email } from './ui/Iconz'
/*
// Example
<Buttonz type='submit'>
  {email}
  <span>SUBSCRIBE</span>
</Buttonz>
*/

function QuickReplyButton ({ title, onClick, disabled }) {
  return (
    <Buttonz disabled={disabled} onClick={onClick}>
      <span>{title}</span>
    </Buttonz>
  )
}

export default QuickReplyButton
