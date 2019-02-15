import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'

// import datas from './datas/ml/terms.json'
// import SlideFlashCard from './components/SlideFlashCard'
import { Iphonez } from './ui/Iphonez'
import { Buttonz } from './ui/Buttonz'
import { email } from './ui/Iconz'

const Appz = styled.div`
   {
    text-align: center;
    display: flex;
    width: 100%;
    flex-grow: 1;
  }
`

const Containerz = styled.div`
   {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const Sectionz = styled.div`
   {
    padding-top: 30px;
  }
`

class App extends Component {
  render () {
    return (
      <Appz>
        <Iphonez>
          <Containerz>
            <Sectionz>
              <Buttonz type='submit'>
                {email}
                <span>SUBSCRIBE</span>
              </Buttonz>
            </Sectionz>
          </Containerz>
        </Iphonez>
      </Appz>
    )
  }
}

export default App
