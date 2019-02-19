// Styles
import styled from 'styled-components'

export const Buttonz = styled.button`
  font-weight: bold;
  cursor: pointer;
  position: relative;
  width: auto;
  display: inline-block;
  color: #ecf0f1;
  text-decoration: none;
  border-radius: 5px;
  border: solid 1px ${props => props.borderColor || '#bdc3c7'};
  background: ${props => props.backgroudColor || '#34495e'};
  text-align: center;
  margin: 8px;
  outline: none;
  height: 26px;
  padding-bottom: 2.2em;
  transition: all 0.1s;
  box-shadow: 0px 1px 1px #bdc3c7;
  :active {
    box-shadow: 0px -2px 0px;
    position: relative;
    top: 2px;
  }
  svg {
    display: inline-block;
    margin-top: 0.1em;
    padding: 0.2em;
  }
  span {
    margin-top: 0.3em;
    display: inline-block;
    vertical-align: top;
    padding: 0.1em;
    height: 16px;
  }
`
