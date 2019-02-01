import React from 'react'
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

export default class QuestionFactory {
  static build ({ title, image }) {
    const Title = styled.div`
      align-self: center;
      flex: ${image ? 0.7 : 1};
      display: flex;
    `
    const Image = styled.div`
      color: black;
      background-color: white;
      flex: 0.3;
      display: ${image ? 'visible' : 'none'};
    `

    return (
      <Flex>
        <Title>
          <InnerContent>
            <h3>{ReactHtmlParser(title)}</h3>
          </InnerContent>
        </Title>
        <Image>
          <InnerContent>
            <img src={`${image}`} />
          </InnerContent>
        </Image>
      </Flex>
    )
  }
}
