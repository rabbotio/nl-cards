import React from 'react'
import MathJax from 'react-mathjax2'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  height: 320px;
  align-content: center;
`
const InnerContent = styled.div`
  align-self: center;
  margin-left: 16px;
  margin-right: 16px;
  ${props => `display:${props.display === undefined || props.display !== null ? 'block' : 'none'}`}
`

const Desc = styled.div`
  align-self: center;
  flex: 0.4;
  display: flex;
  line-height: 1.6em;
  font-size: 0.9em;
  text-align: left;
`

const makeBullets = bullets => {
  return bullets
    ? `<ul>` +
        bullets
          .map(element => `<li style=${element.indexOf('<dfn>') > -1 ? 'margin-top:-1em' : undefined}>${element}</li>`)
          .join('') +
        `</ul>`
    : ''
}

const FlexBullet = ({ left = null, right = null }) => {
  const Bullets = styled.div`
    display: flex;
    flex: 0.4;
    text-align: left;
    font-size: 0.8em;
    justify-content: space-evenly;

    ul {
      list-style: none;
      margin-left: 0.5em;
      padding-left: 0;
      padding-top: 0.5em;
    }

    li {
      padding-left: 1em;
      text-indent: -1.7em;
      padding-bottom: 0.8em;
    }

    li:before {
      content: '★';
      padding-right: 0.8em;
      color: #f1c40f;
      text-shadow: -1px 0 #757575, 0 1px #757575, 1px 0 #757575, 0 -1px #757575;
    }
  `
  return (
    <Bullets>
      <InnerContent display={left}>{ReactHtmlParser(makeBullets(left))}</InnerContent>
      <InnerContent display={right}>{ReactHtmlParser(makeBullets(right))}</InnerContent>
    </Bullets>
  )
}

export default class AnswerFactory {
  static build ({ math, desc, bullets, bullets_extra, image }) {
    const Image = styled.div`
      color: black;
      background-color: white;
      flex: 0.4;
      display: ${image ? 'visible' : 'none'};
    `
    const Math = styled.div`
      color: black;
      background-color: white;
      flex: 0.2;
      display: ${math ? 'visible' : 'none'};
    `
    return (
      <Flex>
        <Desc>
          <InnerContent>{ReactHtmlParser(desc)}</InnerContent>
        </Desc>
        <Image>
          <InnerContent>
            <img src={`${image}`} />
          </InnerContent>
        </Image>
        <Math>
          <InnerContent>
            <MathJax.Context script='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_SVG'>
              <MathJax.Text text={`$$${math}$$`} />
            </MathJax.Context>
          </InnerContent>
        </Math>
        <FlexBullet left={bullets} right={bullets_extra} />
      </Flex>
    )
  }
}
