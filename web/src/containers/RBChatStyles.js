import styled from 'styled-components'

/*
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
*/

function getChatStyle (myBG, yourBG) {
  return styled.div`
    .ios7 {
      margin: 0;
      width: 320px;
      margin: 0 auto;
      padding: 1em 0.8em;
      font-weight: 200;
      font-size: 14px;
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #000;
    }
    .ios7 strong {
      margin: 0;
      padding: 0;
      font-weight: 500;
    }
    .ios7 dd {
      margin: 0;
      padding: 0;
      position: relative;
    }
    .ios7 dt {
      margin: 0;
      padding: 0;
      margin-bottom: 1em;
      text-align: center;
      font-size: 0.6em;
      color: #999;
    }
    .ios7 dd + dt {
      margin: 0;
      padding: 0;
      margin-top: 1.5em;
    }
    .ios7 dd + dd {
      margin: 0;
      padding: 0;
      margin-top: 0.5em;
    }
    .ios7 dd:after {
      margin: 0;
      padding: 0;
      clear: both;
      content: ' ';
      display: block;
      height: 0.1em;
    }
    .ios7 p {
      margin: 0;
      text-align: left;
      float: left;
      z-index: 1;
      margin-right: 25%;
      padding: 0.45em 0.75em;
      background: ${yourBG};
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
      background: ${myBG};
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
      border-right: 1.5em solid ${yourBG};
      border-bottom-right-radius: 50%;
      content: ' ';
      clip: rect(1em, 4em, 3em, 2em);
    }
    .ios7 .to p:last-child::before {
      right: -3em;
      left: auto;
      border-right: none;
      border-left: 1.5em solid ${myBG};
      border-bottom-left-radius: 50%;
      clip: rect(1em, 2em, 2em, 0);
    }
    .ios7 .me {
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      float: right;
      margin-right: -32px;
      margin-left: 8px;
      border-radius: 100%;
      bottom: 2px;
      display: block;
    }
    .ios7 .you {
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      position: absolute;
      margin-left: -40px;
      bottom: 2px;
      float: left;
      display: block;
    }
  `
}

export { getChatStyle }