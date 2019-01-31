const fs = require('fs')
const mjAPI = require('mathjax-node')
mjAPI.start()

const math =
  'L_2\\text{ regularization term} = ||\\boldsymbol w||_2^2 = {w_1^2 + w_2^2 + ... + w_n^2}'

mjAPI.typeset(
  {
    math,
    format: 'TeX',
    svg: true
  },
  function (data) {
    if (!data.errors) {
      const svgResults = fs.writeFile(
        `${+new Date()}.svg`,
        data.svg,
        err => err && console.log(err)
      )
    }
  }
)
