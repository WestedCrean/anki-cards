import React, { useState } from 'react'
import { useSpring, useSprings, animated as a, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'

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
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function CardStack({ front, back, handleNextCard, handlePrevCard }) {
  const [flipped, setFlip] = useState(false)

  const [props, set] = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    ...to(0),
    from: from(0),
  })
  const bind = useGesture(({ down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    const x = down ? xDelta : 0
    const rot = xDelta / 100
    const scale = down ? 1.1 : 1
    set({
      x,
      rot,
      scale,
      delay: undefined,
      config: { friction: 50, tension: down ? 800 : 500 },
    })
  })

  return (
    <Grid onClick={() => setFlip(state => !state)} style={{ width: 500, height: 420 }}>
      <a.div style={{ transform: interpolate([props.x, props.y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
        <Back style={{ opacity: props.opacity.interpolate(o => 1 - o), transform: props.transform }}>
          <CardContent>{back}</CardContent>
        </Back>
        <Front
          style={{
            opacity: props.opacity,
            transform: props.transform.interpolate(t => `${t} rotateY(180deg)`),
          }}
        >
          <CardContent>{front}</CardContent>
        </Front>
      </a.div>
    </Grid>
  )
}

export default CardStack
