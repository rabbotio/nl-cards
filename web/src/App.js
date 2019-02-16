import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'

// import datas from './datas/ml/terms.json'
// import SlideFlashCard from './components/SlideFlashCard'
// import { Iphonez } from './ui/Iphonez'

import RBChatContainer from './containers/RBChatContainer'

const Appz = styled.div`
   {
    text-align: center;
    display: flex;
    width: 1125px;
    flex-flow: column;
    justify-content: center;
  }
`

const Sectionz = styled.div`
   {
    padding: 8px;
  }
`

const Footerz = styled.small`
  color: grey;
`

class App extends Component {
  render () {
    return (
      <Appz>
        <Sectionz>
          <RBChatContainer />
        </Sectionz>
        <Sectionz>
          <Footerz>made w/ ❤ rabbot.io</Footerz>
        </Sectionz>
      </Appz>
    )
  }
}

export default App
