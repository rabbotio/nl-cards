import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  background-color: transparent;
  width: 480px;
  height: 320px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */

  .flip-card-inner {
    transition-timing-function: ease-out;
    transition: 0.4s;
    transform: ${props => (props.revealed ? `rotateX(180deg)` : `rotateX(0deg)`)};
  }
`

function Card ({ front, back, revealed = true }) {
  return (
    <StyledCard revealed={revealed}>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>{front}</div>
        <div className='flip-card-back'>{back}</div>
      </div>
    </StyledCard>
  )
}

export default Card
