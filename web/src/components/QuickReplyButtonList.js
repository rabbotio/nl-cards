import React from 'react'
import QuickReplyButton from './QuickReplyButton'

import styled from 'styled-components'

const QuickReplyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5em;
  justify-content: flex-end;
`

function makeQuickReplyButton (data) {
  return data.map(({ label, value, onClick, disabled }, index) => {
    return <QuickReplyButton key={index} label={label} value={value} onClick={onClick} disabled={disabled} />
  })
}

function QuickReplyButtonList ({ data }) {
  if (!data) return null
  return <QuickReplyButtonContainer>{makeQuickReplyButton(data)}</QuickReplyButtonContainer>
}

export default QuickReplyButtonList
