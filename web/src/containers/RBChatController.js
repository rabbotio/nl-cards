import { injectButtonEvent, injectSubmitEvent } from './RBChatButtonInjector'

const fill = (msgs, target, value) => msgs.map(element => element.replace(new RegExp(target, 'g'), value))
// eslint-disable-next-line
const fillEmail = (msgs, value) => fill(msgs, '\\{{email}}', value)

function addController ({ setEmail, json, goto, email, chatDatas }) {
  const onClick = (event, nextId) => goto(nextId)
  const onSubmit = (event, nextId) => {
    const { value } = event.target.elements[0]

    // Confirm email
    const chatData = json[nextId]
    chatData.msgs = fillEmail(chatData.msgs, value)

    // Set state
    setEmail(value)

    // Go!
    goto(nextId)
  }

  // Set active only last one
  chatDatas.map((item, index) => (item.active = index === chatDatas.length - 1))

  // Add intercept
  const chatData = chatDatas[chatDatas.length - 1]
  if (chatData) {
    // Replace with email
    // TODO : Fix this overfitting!
    chatData.msgs && email && (chatData.msgs = fillEmail(chatData.msgs, email))

    chatData.replies && injectButtonEvent(chatData.replies, { onClick })
    chatData.inputs && injectSubmitEvent(chatData.inputs, { onSubmit })
  }
}

export { addController }
