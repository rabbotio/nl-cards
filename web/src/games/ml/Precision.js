import React from 'react'
import styled from 'styled-components'

const Gamez = styled.span`
   {
    padding-top: 0.5em;
    display: block;
  }
`

const Pz = styled.span`
   {
    background-color: lightpink;
    border-radius: 6px;
    padding: 0.3em 0.1em 0.3em 0.3em;
    margin-left: 0.2em;
    letter-spacing: 0.2em;
  }
`
const Nz = styled.span`
   {
    padding: 0.1em 0em 0.1em 0.3em;
    letter-spacing: 0.2em;
  }
`

const Tz = styled.span`
   {
    font-size: xx-small;
    font-weight: bold;
  }
`

const Cz = styled.span`
  display: inline-block;
  text-align: center;
`

const getPrecision = selections => {
  let TP = 0
  let FP = 0
  selections.forEach(e => {
    if (e === 'TP') TP++
    else if (e === 'FP') FP++
  })
  return {
    answer: TP / (TP + FP),
    how: `
  TP / (TP + FP)
  `,
    solution: `
  ${TP} / (${TP}  + ${FP} )
  `
  }
}

export default ({ total = 4, mode = 'PRECISION', answers = [0, 1, 2, 3, 4] }) => {
  // Random from 2 samples
  const SAMPLES = ['🍏', '🍎']
  const results = []
  let i = 1
  do {
    const sample = SAMPLES[parseInt(SAMPLES.length * Math.random() * ((i + 1) / total))]
    results.push(sample)
  } while (++i <= total)

  // Always have 2 samples
  const F = SAMPLES[0]
  const T = SAMPLES[1]
  results[0] = F
  results[total - 1] = T

  // Select some
  const selections = []
  i = 0
  let isSelectSome = false
  do {
    const weight = Math.sin((0.5 * Math.PI * i) / total)
    const selected = total * Math.random() * weight
    const t_f = isSelect => ((isSelect && results[i] === T) || (!isSelect && results[i] === F) ? 'T' : 'F')

    const isSelect = selected > 0.2 + 0.5 * Math.random()
    isSelect ? selections.push(`${t_f(isSelect)}P`) && (isSelectSome = true) : selections.push(`${t_f(isSelect)}N`)
  } while (++i < total)

  // Select at least 1
  if (!isSelectSome) selections[selections.length - 1] = 'TP'

  // Positive or Negative
  const p_n = (e, s) => (s.indexOf('P') > 0 ? <Pz>{e}</Pz> : <Nz>{e}</Nz>)

  // Get answer
  let { answer } = getPrecision(selections)
  console.log(answer)
  answers = answers.map(e => (answer + (answer + 0.1) * Math.random() - (answer - 0.1) * Math.random()).toFixed(2))
  answers[0] = answer.toFixed(2)
  console.log(answers)

  // Gen dom
  const createQuestion = (results, selections) =>
    results.map((e, i) => (
      <Cz key={i}>
        {p_n(e, selections[i])}
        <br />
        <Tz>{selections[i]}</Tz>
      </Cz>
    ))

  return <Gamez>{createQuestion(results, selections)}</Gamez>
}
