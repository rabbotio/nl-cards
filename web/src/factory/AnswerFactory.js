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

const Desc = styled.div`
  align-self: center;
  flex: 0.4;
  display: flex;
`

const InnerContent = styled.div`
  align-self: center;
  margin-left: 16px;
  margin-right: 16px;
`

const Math = styled.div`
  color: black;
  background-color: white;
  flex: 0.2;
`

const Bullets = styled.div`
  display: flex;
  flex: 0.4;
`

export default class AnswerFactory {
  static math ({ math, desc, bullets }) {
    return (
      <Flex>
        <Desc>
          <InnerContent>{ReactHtmlParser(desc)}</InnerContent>
        </Desc>
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
