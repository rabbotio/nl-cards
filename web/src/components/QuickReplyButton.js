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

const isPositive = title => title.toLowerCase().indexOf('yes') > -1
const isNegative = title => title.toLowerCase().indexOf('no') > -1

const backgroudColor = title => {
  if (isPositive(title)) return '#2ecc71'
  if (isNegative(title)) return '#e74c3c'
}

const borderColor = title => {
  if (isPositive(title)) return '#27ae60'
  if (isNegative(title)) return '#c0392b'
}

function QuickReplyButton ({ title, onClick, disabled }) {
  return (
    <Buttonz
      disabled={disabled}
      onClick={onClick}
      borderColor={borderColor(title)}
      backgroudColor={backgroudColor(title)}
    >
      <span>{title}</span>
    </Buttonz>
  )
}

export default QuickReplyButton
