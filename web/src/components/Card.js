import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  background-color: transparent;
  width: 480px;
  height: 320px;

  /* For render */
  position: absolute;
  top: 0;
  left: 0;

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
