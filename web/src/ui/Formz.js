// Styles
import styled from 'styled-components'

export const Formz = styled.form`
  padding-top: 0.5em;
  float: right;
  input[type='email'] {
    width: 200px;
    height: 22px;
    border-radius: 5px;
    border: solid 1px #bdc3c7;
    box-shadow: 0px 3px 0px #7f8c8d;
    border-width: 0 0 1px;
    padding-left: 0.5em;
    padding-right: 0.5em;

    :focus {
      outline: 0;
      border-width: 1px;
    }
  }
  input[type='submit'] {
    font-weight: bold;
    cursor: pointer;
    position: relative;
    width: auto;
    display: inline-block;
    color: #ecf0f1;
    text-decoration: none;
    border-radius: 5px;
    border: solid 1px #bdc3c7;
    background: #34495e;
    text-align: center;
    margin: 8px;
    outline: none;
    height: 26px;
    transition: all 0.1s;
    box-shadow: 0px 3px 0px #7f8c8d;
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
  }
`
