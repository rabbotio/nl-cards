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

const isPositive = label => label.toLowerCase().indexOf('yes') > -1 || label.toLowerCase().indexOf('hint') > -1
const isNegative = label => label.toLowerCase().indexOf('no') > -1

const backgroudColor = label => {
  if (isPositive(label)) return '#2ecc71'
  if (isNegative(label)) return '#e74c3c'
}

const borderColor = label => {
  if (isPositive(label)) return '#27ae60'
  if (isNegative(label)) return '#c0392b'
}

function QuickReplyButton ({ label, value, onClick, disabled }) {
  return (
    <Buttonz
      value={value}
      disabled={disabled}
      onClick={onClick}
      borderColor={borderColor(label)}
      backgroudColor={backgroudColor(label)}
    >
      <span>{label}</span>
    </Buttonz>
  )
}

export default QuickReplyButton
