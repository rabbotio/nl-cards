import React, { useContext } from 'react'
import QuickReplyButton from './QuickReplyButton'

import styled from 'styled-components'

const QuickReplyButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function makeQuickReplyButton (data) {
  return data.map(({ title, cmd }, index) => {
    return <QuickReplyButton key={index} title={title} cmd={cmd} />
  })
}

function QuickReplyButtonList ({ data }) {
  return <QuickReplyButtonContainer>{makeQuickReplyButton(data)}</QuickReplyButtonContainer>
}

export default QuickReplyButtonList
