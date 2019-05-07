export const generator = selections => {
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
