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
    display: flex;
    flex-direction: column;
    width: 320px;
    margin: 0 auto;
    font-weight: 200;
    font-size: 14px;
    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    color: #000;

    strong {
      font-weight: 400;
    }
    dd {
      position: relative;
    }
    dt {
      margin-bottom: 1em;
      text-align: center;
      font-size: 0.6em;
      color: #999;
    }
    dd + dt {
      margin-top: 1.5em;
    }
    dd + dd {
      margin-top: 0.5em;
    }

    p {
      width: fit-content;
      margin: 0;
      text-align: left;
      margin-right: 25%;
      padding: 0.45em 0.75em;
      background: ${yourBG};
      line-height: 1.25;
      border-radius: 1em;
    }
    .to p {
      text-align: left;
      float: right;
      margin-right: 0;
      margin-left: 25%;
      background: ${myBG};
      color: #fff;
    }
    p + p {
      margin-top: 0.1em;
    }
    p:last-child {
      position: relative;
    }
    p:last-child::before {
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
    .to p:last-child::before {
      right: -3em;
      left: auto;
      border-right: none;
      border-left: 1.5em solid ${myBG};
      border-bottom-left-radius: 50%;
      clip: rect(1em, 2em, 2em, 0);
    }
    .me {
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      float: right;
      margin-right: -32px;
      margin-left: 8px;
      border-radius: 100%;
      bottom: 0px;
      display: block;
    }
    .you {
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      position: absolute;
      margin-left: -40px;
      bottom: 0px;
      float: left;
      display: block;
    }
  `
}

const getTypingChatData = ({ uid, name, img }) =>
  Object.assign(
    {},
    {
      uid,
      name,
      img,
      msgs: [
        `<span id="wave">
<span class="dot"></span>
<span class="dot"></span>
<span class="dot"></span>
</span>`
      ]
    }
  )

export { getChatStyle, getTypingChatData }
