import React from 'react'

function Card ({ front, back }) {
  return (
    <div className='flip-card'>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>{back}</div>
        <div className='flip-card-back'>{back}</div>
      </div>
    </div>
  )
}

export default Card
