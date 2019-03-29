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

const getAnswers = (selections, totalAnswers = 4) => {
  let { answer } = getPrecision(selections)
  let answers = Array(totalAnswers).fill('?')
  answers = answers.map(e => (answer + (answer + 0.1) * Math.random() - (answer - 0.1) * Math.random()).toFixed(2))
  answers[0] = answer.toFixed(2)
  return answers
}

const getTF = SAMPLES => ({ F: SAMPLES[0], T: SAMPLES[SAMPLES.length - 1] })

const getRandomData = (SAMPLES, total) => {
  // Random from 2 samples
  const datas = []
  let i = 1
  do {
    const sample = SAMPLES[parseInt(SAMPLES.length * Math.random() * ((i + 1) / total))]
    datas.push(sample)
  } while (++i <= total)

  // Always have 2 samples
  const { T, F } = getTF(SAMPLES)
  datas[0] = F
  datas[total - 1] = T

  return datas
}

const getSelections = (SAMPLES, datas) => {
  const { T, F } = getTF(SAMPLES)
  const total = datas.length

  // Select some
  const selections = []
  let i = 0
  let isSelectSome = false
  const t_f = isSelect => ((isSelect && datas[i] === T) || (!isSelect && datas[i] === F) ? 'T' : 'F')

  do {
    const weight = Math.sin((0.5 * Math.PI * i) / total)
    const selected = total * Math.random() * weight
    const isSelect = selected > 0.2 + 0.5 * Math.random()

    isSelect ? selections.push(`${t_f(isSelect)}P`) && (isSelectSome = true) : selections.push(`${t_f(isSelect)}N`)
  } while (++i < total)

  // Select at least 1
  if (!isSelectSome) selections[selections.length - 1] = 'TP'

  return selections
}

export default class GameFactory {
  static build = () => {
    // Props
    const total = 4
    // const mode = 'PRECISION'

    // Predefined
    const SAMPLES = ['🍏', '🍎']

    // Get random samples
    const datas = getRandomData(SAMPLES, total)

    // Get selections
    const selections = getSelections(SAMPLES, datas)

    // Get answer
    const answers = getAnswers(selections)

    return { datas, selections, answers }
  }
}
