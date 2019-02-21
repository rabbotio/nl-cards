import React, { Component } from 'react'

import CardList from './components/CardList'
import datas from './datas/ml/terms.json'

class Editor extends Component {
  render () {
    const cid = parseInt(this.props.match.params.cid)
    return <CardList datas={datas} cid={cid} />
  }
}

export default Editor
