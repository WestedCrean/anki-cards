import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Deck from './deck'
import { ActionCard } from './actionCards'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import red from '@material-ui/core/colors/red'
import { useAuth } from 'context/auth'
import { getDecks, deleteDeck } from 'services/decks'
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

function DeckView() {
  const classes = useStyles()
  const { authTokens, setAuthTokens } = useAuth()

  const [toastOpen, setToastOpen] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState('success')
  const [toastMessage, setToastMessage] = React.useState('')

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToastOpen(false)
  }

  const [deletionMode, setDeletionMode] = React.useState(false)
  const [decks, setDecks] = React.useState([])

  async function fetchDecks() {
    try {
      const res = await getDecks(authTokens.tokens)
      if (res.status === 200) {
        setDecks(res.data)
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

  async function handleDelete(deckId) {
    const newDecks = decks.slice()
    try {
      const res = await deleteDeck(authTokens.tokens, deckId)
      if (res.status === 204) {
        setDecks(newDecks.filter(e => e.id !== deckId))
        await fetchDecks()
      }
    } catch (e) {
      setToastSeverity('error')
      if (e.response) {
        setToastMessage('Nieoczekiwany błąd po stronie serwera.')
      } else {
        if (e.response) {
          setToastMessage('Utracono połączenie z serwerem.')
        }
      }
      setToastOpen(true)
    }

  }


  React.useEffect(() => {
    if (decks.length === 0 && deletionMode) {
      setDeletionMode(false)
    }
  }, [decks, deletionMode])

  React.useEffect(() => {
    fetchDecks()
  }, [])

  return (
    <React.Fragment>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="left">
            Twoje talie
          </Typography>

          <Button
            variant="contained"
            className={classes.deleteBtn}
            disabled={decks.length === 0}
            onClick={() => {
              setDeletionMode(!deletionMode)
            }}
          >
            Usuń talię
          </Button>

          <Grid container spacing={3}>
            {decks.map((el, i) => (
              <Deck
                title={el.name}
                key={'deck-' + i}
                category={el.category}
                deckid={el.id}
                deletionMode={deletionMode}
                onChange={handleDelete}
              />
            ))}
            <ActionCard to="/decks/create" color={'#ffbd45'}>
              <p>Stwórz nową talię</p>
            </ActionCard>
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

const MemoDeckView = React.memo(DeckView, isDeckViewSame)

export default DeckView
