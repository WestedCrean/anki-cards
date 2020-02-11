import React, { useState } from 'react'
import { useSpring, animated as a, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

const C = styled(a.div)`
  border: 1px solid #e3e3e3;
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
  user-select: none;
`


const CardContent = styled.p`
  margin: auto;
`

const Front = styled(C)`
  transform: rotateY(0deg);
`
const Back = styled(C)`
  transform: rotateY(0deg);
`
const trans = (x, s) => `translate3d(${x}px,50px,0) rotate(${x / 10}deg) scale(${s})`

const transShadow = (x, s) => `0 10px 20px rgba(0,0,0,0.19), 0 ${90 * s - 84}px ${60 * s - 54}px rgba(0,0,0,0.23)`

function CardStack({ front, back, handleNextCard, handlePrevCard }) {
  const [flipped, setFlip] = useState(true)
  const [props, set, stop]/* { x, y, size, transform, opacity } */ = useSpring(() => ({
    x: 0,
    size: 1,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    opacity: flipped ? 1 : 0,
  }))
  const bind = useDrag(({ down, swipe, tap, movement: [mx, my] }) => {
    console.log(mx)
    if (tap && !down) {
      console.log({ tap, down })
      setFlip(!flipped)
      set({
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        opacity: flipped ? 1 : 0
      })
    }

    if (mx >= 0) {
      set({
        x: down ? mx <= 200 ? mx : 200 : 0,
        size: down ? 1.1 : 1
      })
      if (mx > 400) {
        setTimeout(200, () => {
          set({
            x: 0,
            size: 1
          })
          handleNextCard()
        })
      } else if (mx < -400) {
        setTimeout(200, () => {
          set({
            x: 0,
            size: 1
          })
          handlePrevCard()
        })
      }
    } else {
      set({
        x: down ? mx >= -200 ? mx : -200 : 0,
        size: down ? 1.1 : 1
      })
    }
    if (swipe) {
      if (swipe[0] === 1) {
        handleNextCard()
      } else if (swipe[0] === -1) {
        handlePrevCard()
      }

    }
  })

  return (
    <Grid style={{ width: 500, height: 1000 }}>
      <a.div {...bind()} style={{ transformOrigin: 'center', transform: interpolate([props.x, props.size], trans) }}>
        <Back style={{ opacity: props.opacity.interpolate(o => 1 - o), transform: props.transform, boxShadow: interpolate([props.x, props.size], transShadow) }}>
          <CardContent>{back}</CardContent>
        </Back>
        <Front style={{ opacity: props.opacity, transform: props.transform.interpolate(t => `${t} rotateY(180deg)`), boxShadow: interpolate([props.x, props.size], transShadow) }}>
          <CardContent>{front}</CardContent>
        </Front>
      </a.div>
    </Grid>
  )
}

export default CardStack
