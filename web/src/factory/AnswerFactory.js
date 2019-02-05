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
`

const Desc = styled.div`
  align-self: center;
  flex: 0.4;
  display: flex;
  line-height: 1.6em;
  font-size: 0.9em;
  text-align: left;
`

const Bullets = styled.div`
  display: flex;
  flex: 0.4;
  text-align: left;
  font-size: 0.8em;

  ul {
    list-style: none;
    margin-left: 0.5em;
    padding-left: 0;
    padding-top: 0.5em;
  }

  li {
    padding-left: 1em;
    text-indent: -1.7em;
    line-height: 1.2em;
    margin-block-start: -0.5em;
    #min-height: 2.2em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  li:before {
    content: '⭐';
    padding-right: 5px;
  }
`

const makeBullets = bullets => {
  return `<ul>` + bullets.map(element => `<li>${element}</li>`).join('') + `</ul>`
}

export default class AnswerFactory {
  static build ({ math, desc, bullets, image }) {
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
        <Bullets>
          <InnerContent>{ReactHtmlParser(makeBullets(bullets))}</InnerContent>
        </Bullets>
      </Flex>
    )
  }
}
