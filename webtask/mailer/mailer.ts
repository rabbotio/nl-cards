// It should read queued tasks from Firebase and email.

const getBody = ({ link }) => `<a href="${link}/?sid=%recipient.sid%">Click me</a>`

// MailGun
const MAILGUN_API_KEY = `${MAILGUN_API_KEY}`
const MAILGUN_DOMAIN = `${MAILGUN_DOMAIN}`
const CALLBACK_LINK_URI = `${CALLBACK_LINK_URI}`

// Common
const { getJSON } = require('@rabbotio/fetcher')

// ---------- Core ----------

const willSentReportWithEmail = async ({ recipients_vars, host, score, grade, failed, scannedAt }) => {
  // MailGun
  const mailgun = require('mailgun-js')({
    apiKey: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN
  })

  // Link back
  const link = `${CALLBACK_LINK_URI}`
  const to = Object.keys(recipients_vars)

  const getHTML = () => `<html>
  <style>
  p {
    font-family: 'Lucida Grande','Lucida Sans','Lucida Sans Unicode',Arial,Helvetica,Verdana,sans-serif;
    color: #111111;
    font-size: 12px;
  }
  hr {
    border-top: dotted 1px;
  }
  </style>
  <body>
    ${getBody({ link })}
  </body></html>`

  // Payload
  const data = {
    to,
    from: `noreply@${MAILGUN_DOMAIN}`,
    'recipient-variables': recipients_vars,
    subject: `[FoxFox] Hi!`,
    html: getHTML()
  }

  console.info(` [i] Email :`, data)

  return new Promise((resolve, reject) => mailgun.messages()
    .send(data, (err, body) => err ? reject(err) : resolve(body)))
}

const willSendEmail = async () => {
  // TODO : Get outboxes
  let error = null
  const outboxes = []

  // Guard error
  if (error) throw new Error(error)

  // Guard data
  if (outboxes.length <= 0) {
    console.info(` [i] Empty outboxes`)
    return false
  }

  // Sent first one
  console.info(` [i] Outboxes : ${JSON.stringify(outboxes.length)}`)
  Promise.all(outboxes.map(async (element, index) => {
    // Logs
    console.info(` [i] Sending email : ${index}`)

    // Email to recipients
    return willSentReportWithEmail(element).then(() => {
      // Log
      console.info(` [i] Email sent at : ${index}`)
    })
  }))

  return true
}

module.exports = function (cb) {
  willSendEmail()
    .then(result => cb(null, { at: new Date().toISOString() }))
    .catch(err => {
      // Email not sent
      console.error(` [@] Send mail error :`, JSON.stringify(err))
      cb(err, null)
    })
}
