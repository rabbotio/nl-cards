import { injectButtonEvent, injectSubmitEvent } from './RBChatButtonInjector'

const fill = (msgs, target, value) => msgs.map(element => element.replace(new RegExp(`\\{{${target}}}`, 'g'), value))
const fillEmail = (msgs, value) => fill(msgs, 'email', value)
const fillScore = (msgs, value) => fill(msgs, 'score', value)

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
  if (!chatData) return
  switch (chatData.context) {
    case 'RESULTS':
      if (user.losts.length <= 0) break

      // Add score
      chatData.msgs = fillScore(chatData.msgs, `${user.losts.length} memor${user.losts.length === 1 ? 'y' : 'ies'}`)

      // Reset and Retry
      user.context = 'RETRY'
      user.losts = []
      setTopic('')

      goto('2.1')
      break
    case 'CONFIRM_EMAIL':
      if (!email || user.losts.length <= 0) break

      chatData.msgs = fillEmail(chatData.msgs, email)
      break
    default:
      // Do something?
      break
  }

  // Inject
  chatData.replies && injectButtonEvent(chatData.replies, { onClick })
  chatData.inputs && injectSubmitEvent(chatData.inputs, { onSubmit })
}

export { addController }
