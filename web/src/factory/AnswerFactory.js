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
`

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
          <InnerContent>{ReactHtmlParser(bullets)}</InnerContent>
        </Bullets>
      </Flex>
    )
  }
}
