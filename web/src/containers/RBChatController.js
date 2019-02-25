import { injectButtonEvent, injectSubmitEvent } from './RBChatButtonInjector'

const fill = (msgs, target, value) => msgs.map(element => element.replace(new RegExp(target, 'g'), value))
const fillEmail = (msgs, value) => fill(msgs, '\\{{email}}', value)

function addController (user, { setTopic, setEmail, json, goto, email, chatDatas, callback }) {
  const onClick = (event, { label, text, value, jump }) => {
    const _replyId = `_${jump}`

    // Auto reply
    json[_replyId] = Object.assign(
      {
        msgs: [text || label],
        jump
      },
      user.profile
    )

    // Go!
    goto(_replyId)

    // Do something with value
    callback(value)
  }

  const onSubmit = (event, { jump }) => {
    const { value } = event.target.elements[0]

    // Confirm email
    const chatData = json[jump]
    chatData.msgs = fillEmail(chatData.msgs, value)

    // Set state
    setEmail(value)

    // Go!
    goto(jump)
  }

  // Set active only last one
  chatDatas.map((item, index) => (item.active = index === chatDatas.length - 1))

  // Add intercept
  const chatData = chatDatas[chatDatas.length - 1]
  if (chatData) {
    // TODO : Clean this!!!
    // RESULTS?
    if (chatData.context === 'RESULTS' && user.losts.length > 0) {
      user.context = 'RETRY'
      user.losts = []
      setTopic('')
      goto('2.1')
      return
    }

    // TODO : Use context EMAIL
    // Replace {{email}} with email
    chatData.msgs &&
      chatData.msgs[0].indexOf('{{email}}') > 0 &&
      email &&
      (chatData.msgs = fillEmail(chatData.msgs, email))

    // Inject
    chatData.replies && injectButtonEvent(chatData.replies, { onClick })
    chatData.inputs && injectSubmitEvent(chatData.inputs, { onSubmit })
  }
}

export { addController }
