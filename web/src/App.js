import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'

// import datas from './datas/ml/terms.json'
// import SlideFlashCard from './components/SlideFlashCard'
import { Iphonez } from './ui/Iphonez'
import { Buttonz } from './ui/Buttonz'
import { email } from './ui/Iconz'
import Msgz from './ui/Msgz'

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
    padding: 12px;
  }
`
const Containerz = styled.div`
   {
    flex-flow: row;
  }
`

const Dialogz = styled.div`
   {
    right: -3em;
    left: auto;
    border-right: none;
    border-left: 1.5em solid grey;
    border-bottom-left-radius: 50%;
    clip: rect(1em, 2em, 2em, 0);
  }
`
const YOU_BG_COLOR = '#ecf0f1'
const ME_BG_COLOR = '#3498db'

const Chatz = styled.div`
  * {
    margin: 0;
    padding: 0;
  }
  .ios7 {
    width: 320px;
    margin: 0 auto;
    padding: 1em 0.8em;
    font-weight: 200;
    font-size: 14px;
    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    color: #000;
  }
  .ios7 strong {
    font-weight: 500;
  }
  .ios7 dd {
    position: relative;
  }
  .ios7 dt {
    margin-bottom: 1em;
    text-align: center;
    font-size: 0.6em;
    color: #999;
  }
  .ios7 dd + dt {
    margin-top: 1.5em;
  }
  .ios7 dd + dd {
    margin-top: 0.5em;
  }
  .ios7 dd:after {
    clear: both;
    content: ' ';
    display: block;
    height: 0.1em;
  }
  .ios7 p {
    text-align: left;
    float: left;
    z-index: 1;
    margin-right: 25%;
    padding: 0.45em 0.75em;
    background: ${YOU_BG_COLOR};
    line-height: 1.25;
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
  }
  .ios7 .to p {
    text-align: left;
    float: right;
    margin-right: 0;
    margin-left: 25%;
    background: ${ME_BG_COLOR};
    color: #fff;
  }
  .ios7 p + p {
    margin-top: 0.1em;
  }
  .ios7 p:last-child {
    position: relative;
  }
  .ios7 p:last-child::before {
    position: absolute;
    bottom: 0;
    left: -3em;
    z-index: -1;
    width: 3em;
    height: 2em;
    border-right: 1.5em solid ${YOU_BG_COLOR};
    border-bottom-right-radius: 50%;
    content: ' ';
    clip: rect(1em, 4em, 3em, 2em);
  }
  .ios7 .to p:last-child::before {
    right: -3em;
    left: auto;
    border-right: none;
    border-left: 1.5em solid ${ME_BG_COLOR};
    border-bottom-left-radius: 50%;
    clip: rect(1em, 2em, 2em, 0);
  }
  .ios7 .me {
    width: 32px;
    height: 32px;
    float: right;
    margin-right: -32px;
    margin-left: 8px;
    border-radius: 100%;
    transform: scaleX(-1);
    bottom: 2px;
    display: block;
  }
  .ios7 .you {
    width: 32px;
    height: 32px;
    position: absolute;
    margin-left: -40px;
    transform: scaleX(-1);
    bottom: 2px;
    float: left;
    display: block;
  }
`

let data = [
  {
    id: 0,
    uid: '1',
    name: 'kat',
    img: './img/kat.png',
    msgs: [`We only have <b>ML</b> for <b>MVP</b>`, `Wanna try?`],
    replies: [{ title: 'Yes!' }]
  },
  {
    id: 1,
    uid: '0',
    name: 'you',
    img: './img/foo.png',
    msgs: [`Yes!`]
  }
]

class App extends Component {
  render () {
    return (
      <Appz>
        <Sectionz>
          <Containerz>
            <Chatz>
              <dl className='ios7'>
                {data.map(item => (
                  <Msgz key={item.id} {...item} />
                ))}
              </dl>
            </Chatz>
          </Containerz>
        </Sectionz>
        <Sectionz>
          <Buttonz type='submit'>
            {email}
            <span>SUBSCRIBE</span>
          </Buttonz>
        </Sectionz>
      </Appz>
    )
  }
}

export default App
