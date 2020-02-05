import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

import CreateCard from './createCard'
import FlipCard from './flipCard'
import { createDeck } from 'services/decks'
import { useAuth } from 'context/auth'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  deckNameContainer: {
    paddingRight: 16,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 'initial',
      paddingBottom: 16
    },
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

export default function CreateDeckView() {
  const classes = useStyles()
  const { authTokens, setAuthTokens } = useAuth()
  const history = useHistory()
  const [toastOpen, setToastOpen] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState('success')
  const [toastMessage, setToastMessage] = React.useState('')

  const [cardFinished, setCardFinished] = React.useState(false)
  const [deck, setDeck] = React.useState({
    name: '',
    cards: [],
  })

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToastOpen(false)
    history.push('/')
  }

  const handleNewcard = card => {
    const cards = deck.cards.slice()
    cards.push(card)
    setDeck({ ...deck, cards: cards })
  }
  const handleNameChange = event => {
    setDeck({ ...deck, name: event.target.value })
  }

  const submitCard = async () => {
    if (cardFinished) {
      try {
        const res = await createDeck(authTokens.tokens, deck)
        if (res.status === 201) {
          setToastSeverity('success')
          setToastMessage('Pomyślnie utworzono nową talię')
          setToastOpen(true)
        }
      } catch (e) {
        setToastSeverity('error')
        console.log({ e })
        if (e.response) {
          setToastMessage('Proszę sprawdzić poprawność formularza i spróbować ponownie.')
        } else {
          setToastMessage('Nieoczekiwany błąd po stronie serwera.')
        }
        setToastOpen(true)
      }
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
  }, [deck, cardFinished])

  return (
    <React.Fragment>
      <Container>
        <Box my={4}>
          <Grid container style={{ marginBottom: '3rem' }}>
            <Grid xs={12} md={5} item className={classes.deckNameContainer}>
              <Input
                placeholder={'Nowa talia'}
                fullWidth
                onChange={handleNameChange}
                className={classes.deckName}
              />
            </Grid>
            <Grid xs={12} md={5} item>
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
            <CreateCard handleNewcard={handleNewcard} />
            {deck.cards.map(card => (
              <FlipCard front={card.front} back={card.back} />
            ))}
          </Grid>
        </Box>
      </Container>
      <Snackbar
        open={toastOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
