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

    // TODO : Support more input type
    console.log(event.target.type)

    const _replyId = `_${jump}`

    // Auto reply
    json[_replyId] = Object.assign(
      {
        msgs: [value],
        jump: 'CONFIRM_EMAIL'
      },
      user.profile
    )

    // Set state
    setEmail(value)

    // Go!
    goto(_replyId)
  }

  // Set active only last one
  chatDatas.map((item, index) => (item.active = index === chatDatas.length - 1))

  // Add intercept
  const chatData = chatDatas[chatDatas.length - 1]
  const botContext = chatData.context
  if (!chatData) return

  // console.log(`botContext:${botContext}`)

  const lost = user.losts.length
  // console.log(lost)

  switch (botContext) {
    case 'QUEST_END':
      // Add score
      chatData.msgs = fillScore(
        chatData.msgs,
        `${lost <= 0 ? 'Complete all' : `You failed ${lost}`} quest${lost === 1 ? '!' : 's!'}`
      )

      if (lost > 0) {
        // Reset and Retry
        user.context = 'RETRY'
        user.losts = []
        setTopic('')

        goto('RETRY')
      }
      break
    case 'CARD_END':
      // Add score
      chatData.msgs = fillScore(chatData.msgs, `${lost <= 0 ? 'no' : lost} memor${lost === 1 ? 'y' : 'ies'}`)

      if (lost > 0) {
        // Reset and Retry
        user.context = 'RETRY'
        user.losts = []
        setTopic('')

        goto('RETRY')
      }
      break
    case 'CONFIRM_EMAIL':
      if (!email || lost <= 0) break

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
