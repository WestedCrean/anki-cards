import React, { useState } from 'react'
import { useSpring, animated as a, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

const C = styled(a.div)`
  border-radius: 4px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2rem;
  position: absolute;
  max-width: 500px;
  max-height: 500px;
  width: 50ch;
  height: 42ch;
  cursor: pointer;
  will-change: transform, opacity;
  backface-visibility: hidden;
  overflow-y: auto;
  padding: 1rem 2rem;
  display: grid;
  margin: 0 auto;
  font-weight: 500;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`
const CardContent = styled.p`
  margin: auto;
`

const Front = styled(C)`
  transform: rotateY(0deg);
  background: orange;
`
const Back = styled(C)`
  transform: rotateY(0deg);
  background: blue;
`

function CardStack({ front, back, handleNextCard, handlePrevCard }) {
  const [flipped, setFlip] = useState(false)
  const { x, y, size, transform, opacity } = useSpring({
    x: 0,
    y: 0,
    size: 1,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    opacity: flipped ? 1 : 0,
  })
  const bind = useDrag(({ down, tap, movement: [mx, my] }) => {
    console.log({ down, tap, mov: [mx, my] })
    if (tap) {
      setFlip(!flipped)
    }
    x = down ? mx : 0
    /*
    
    set({
      x: down ? mx : 0,
      y: down ? my : 0,
      size: down ? 1.1 : 1,
      opacity,
      transform,
    })
    */
  })
  React.useEffect(() => console.log(flipped), [flipped])

  return (
    <Grid style={{ width: 500, height: 420 }}>
      <a.div {...bind()} style={{ x, y }}>
        <Back style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
          <CardContent>{back}</CardContent>
        </Back>
        <Front style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
          <CardContent>{front}</CardContent>
        </Front>
      </a.div>
    </Grid>
  )
}

export default CardStack
