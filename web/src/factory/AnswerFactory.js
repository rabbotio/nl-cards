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
  img {
    width: 100%;
    height: auto;
  }
`

const Desc = styled.div`
  align-self: center;
  flex: 0.3;
  display: flex;
  line-height: 1.3em;
  text-align: left;
  font-size: 0.9em;
  margin-block-start: 1em;
  margin-block-end: 1em;
`

const makeBullets = bullets => {
  return bullets
    ? `<ul>` +
        bullets
          .map(
            element =>
              `<li style=${
                element.indexOf('<dfn>') > -1 ? '"margin-top:-1em; line-height: 0.6em;"' : undefined
              }>${element}</li>`
          )
          .join('') +
        `</ul>`
    : ''
}

const FlexBullet = ({ left = null, right = null }) => {
  const Bullets = styled.div`
    display: flex;
    flex: 0.6;
    text-align: left;
    justify-content: space-evenly;
    font-size: 0.85em;

    ul {
      list-style: none;
      margin-left: 0.5em;
      padding-left: 0;
    }

    li {
      padding-left: 1em;
      text-indent: -1.7em;
      padding-bottom: 0.7em;
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
      flex: 0.3;
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
            <img src={image} alt={desc} />
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
