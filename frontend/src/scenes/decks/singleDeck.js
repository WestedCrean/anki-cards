import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CardStack from './CardStack'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import red from '@material-ui/core/colors/red'
import { useAuth } from 'context/auth'
import { getSingleDeck } from 'services/decks'
import { refreshToken } from 'services/auth'

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
  deleteBtn: {
    float: 'right',
    backgroundColor: red.A400,
    color: 'white',
    '&:hover': {
      background: red.A200,
    },
  },
}))

function SingleDeck() {
  const classes = useStyles()
  const { authTokens, setAuthTokens } = useAuth()
  const { deckId } = useParams()
  const [toastOpen, setToastOpen] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState('success')
  const [toastMessage, setToastMessage] = React.useState('')
  const [deck, setDeck] = React.useState(false)
  const [currentCard, setCurrentCard] = React.useState(0)
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToastOpen(false)
  }

  async function fetchDeck(deckId) {
    try {
      const res = await getSingleDeck(authTokens.tokens, deckId)
      if (res.status === 200) {
        setDeck(res.data)
      }
    } catch (e) {
      setToastSeverity('error')
      console.log({ e })
      if (e.response) {
        if (e.response.status === 401) {
          const authRes = await refreshToken(authTokens.tokens)
          if (authRes.status === 200) {
            const user = authRes.data.user
            const tokens = authRes.data.tokens
            setAuthTokens({ tokens, user })
            setToastMessage('Spróbuj ponownie.')
          }
        } else {
          setToastMessage('Nieoczekiwany błąd po stronie serwera.')
        }
      } else {
        setToastMessage('Utracono połączenie z serwerem.')
      }
      setToastOpen(true)
    }
  }

  React.useEffect(() => {
    fetchDeck(deckId)
  }, [deckId])

  return (
    <React.Fragment>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="left">
            {deck && deck.name}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="left">
            Liczba kart: {deck && deck.cards.length}
          </Typography>

          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} className={classes.root}>
              <CardStack
                front={deck ? deck.cards[currentCard].front : ''}
                back={deck ? deck.cards[currentCard].back : ''}
                handleNextCard={() => {
                  deck && deck.cards.length - 1 !== currentCard && setCurrentCard(currentCard + 1)
                }}
                handlePrevCard={() => {
                  deck && currentCard !== 0 && setCurrentCard(currentCard - 1)
                }}
              />
            </Grid>
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

function isDeckViewSame(prevProps, nextProps) {
  return true
}

const MemoSingleDeck = React.memo(SingleDeck, isDeckViewSame)

export default SingleDeck
