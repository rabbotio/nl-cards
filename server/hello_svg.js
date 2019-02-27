const fs = require('fs')
const mjAPI = require('mathjax-node')
mjAPI.start()

const math = 'L_1\\text{ regularization term} = ||\\boldsymbol w||_1 = {|w_1| + |w_2| + ... + |w_n|}'

mjAPI.typeset(
  {
    math,
    format: 'TeX',
    svg: true
  },
  function (data) {
    if (!data.errors) {
      const svgResults = fs.writeFile(`${+new Date()}.svg`, data.svg, err => err && console.log(err))
    }
  }
)
