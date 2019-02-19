import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'
// import SlideFlashCard from './components/SlideFlashCard'
// import datas from './datas/ml/terms.json'
// import SlideFlashCard from './components/SlideFlashCard'
// import { Iphonez } from './ui/Iphonez'

import RBChatContainer from './containers/RBChatContainer'

const Appz = styled.div`
   {
    text-align: center;
    display: flex;
    max-width: 640px;
    flex-flow: column;
    justify-content: center;
  }
`

const Sectionz = styled.div`
   {
    padding: 0px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: ${props => props.align};
  }
`

const Hrz = styled.hr`
   {
    width: 480px;
    border-width: 0.5px;
  }
`
const Footerz = styled.small`
  color: grey;
`

class App extends Component {
  render () {
    return (
      <Appz>
        <Sectionz align='flex-end'>
          <RBChatContainer />
        </Sectionz>
        <Hrz />
        <Sectionz align='flex-start'>
          <Footerz>made w/ ❤ rabbot.io</Footerz>
        </Sectionz>
      </Appz>
    )
  }
}

export default App
