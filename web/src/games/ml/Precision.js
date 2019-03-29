import React from 'react'
import styled from 'styled-components'

const Gamez = styled.span`
   {
    padding-top: 0.5em;
    display: block;
  }
`

const Pos = styled.span`
   {
    background-color: lightpink;
    border-radius: 6px;
    padding: 0.3em 0.1em 0.3em 0.3em;
    margin-left: 0.2em;
    letter-spacing: 0.2em;
  }
`
const Neg = styled.span`
   {
    padding: 0.1em;
    letter-spacing: 0.2em;
  }
`

const Txt = styled.span`
   {
    font-size: xx-small;
    font-weight: bold;
    padding-left: 1.2em;
    display: inline-block;
    text-align: center;
  }
`

export default () => (
  <Gamez>
    <Pos>🍎</Pos>
    <Neg>🍎🍏</Neg>
    <br />
    <Txt>TP</Txt>
    <Txt>FN</Txt>
    <Txt>TN</Txt>
  </Gamez>
)
