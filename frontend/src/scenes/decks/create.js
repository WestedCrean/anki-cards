import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

import Deck from './deck'
import { ActionCard } from './actionCards'
import CreateCard from './createCard'
import FlipCard from './flipCard'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'white',
  },
  card: {
    minWidth: 275,
    height: '100%',
    cursor: 'pointer',
    backgroundColor: '#97c2a0',
  },
  input: {
    display: 'none',
  },
  add: {
    fontSize: '3rem',
  },
  deckName: {
    fontSize: '3rem',
  },
  submitButton: {
    height: '100%',
  },
}))

export default function CreateDeckView() {
  const classes = useStyles()
  const [cardFinished, setCardFinished] = React.useState(false)
  const [deck, setDeck] = React.useState({
    name: '',
    cards: [],
  })

  const handleNewcard = card => {
    const cards = deck.cards.slice()
    cards.push(card)
    setDeck({ ...deck, cards: cards })
  }
  const handleNameChange = event => {
    setDeck({ ...deck, name: event.target.value })
  }

  const submitCard = () => {
    if (cardFinished) {
      alert('Submit!')
    }
  }

  React.useEffect(() => {
    const { name, cards } = deck
    if (name !== '' && cards.length > 0) {
      setCardFinished(true)
    } else {
      if (cardFinished) {
        setCardFinished(false)
      }
    }
  }, [deck])

  return (
    <Container>
      <Box my={4}>
        <Grid container style={{ marginBottom: '3rem' }}>
          <Grid xs={5} md={5} item style={{ paddingRight: 16 }}>
            <Input
              placeholder={'Nowa talia'}
              fullwidth
              onChange={handleNameChange}
              className={classes.deckName}
            />
          </Grid>
          <Grid xs={5} md={5} alignItems="center" item>
            <Button
              disabled={!cardFinished}
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={submitCard}
            >
              Stwórz
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <CreateCard onaddnewcard={handleNewcard} />
          {deck.cards.map(card => (
            <FlipCard front={card.front} back={card.back} />
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
