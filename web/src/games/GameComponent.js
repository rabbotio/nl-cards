import React, { Component } from 'react'
import styled from 'styled-components'

const Gamez = styled.span`
   {
    padding-top: 0.5em;
    display: block;
  }
`

const Pz = styled.span`
   {
    background-color: lightpink;
    border-radius: 6px;
    padding: 0.3em 0.1em 0.3em 0.4em;
    margin-left: 0.2em;
  }
`
const Nz = styled.span`
   {
    padding: 0.1em 0em 0.1em 0.3em;
  }
`

const Tz = styled.span`
   {
    font-size: xx-small;
    font-weight: bold;
  }
`

const Cz = styled.span`
  display: inline-block;
  text-align: center;
`

export default class GameComponent extends Component {
  render () {
    const { datas, selections } = this.props
    console.log(datas, selections)

    // ------------------------------------------

    // Positive or Negative
    const p_n = (e, s) => (s.indexOf('P') > 0 ? <Pz>{e}</Pz> : <Nz>{e}</Nz>)

    // Gen dom
    const createQuestion = (datas, selections) =>
      datas.map((e, i) => (
        <Cz key={i}>
          {p_n(e, selections[i])}
          <br />
          <Tz>{selections[i]}</Tz>
        </Cz>
      ))

    return <Gamez>{createQuestion(datas, selections)}</Gamez>
  }
}
