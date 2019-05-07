export const generator = selections => {
  let TP = 0
  let FN = 0
  selections.forEach(e => {
    if (e === 'TP') TP++
    else if (e === 'FN') FN++
  })
  return {
    answer: TP / (TP + FN),
    how: `
    TP / (TP + FN)
    `,
    solution: `
    ${TP} / (${TP}  + ${FN} )
    `
  }
}
