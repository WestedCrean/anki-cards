import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Deck from './deck'
import { ActionCard } from './actionCards'
import red from '@material-ui/core/colors/red'

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

export default function DeckView() {
  const classes = useStyles()

  const [deletionMode, setDeletionMode] = React.useState(false)
  const [decks, setDecks] = React.useState([
    { name: 'Talia1', featured: true, slug: 'talia-1', category: 'Computer Science' },
    { name: 'Talia2', featured: false, slug: 'talia-2', category: 'Physics' },
    { name: 'Talia3', featured: false, slug: 'talia-3', category: 'Math' },
    { name: 'Talia4', featured: false, slug: 'talia-4', category: 'Philosophy' },
    { name: 'Talia5', featured: false, slug: 'talia-5', category: 'Math' },
    { name: 'Talia6', featured: false, slug: 'talia-6', category: 'History' },
    { name: 'Talia7', featured: false, slug: 'talia-7', category: 'Physics' },
    { name: 'Talia8', featured: false, slug: 'talia-8', category: 'Economy' },
    { name: 'Talia9', featured: true, slug: 'talia-9', category: 'Philosophy' },
    { name: 'Talia10', featured: false, slug: 'talia-10', category: 'Economy' },
  ])

  const handleDelete = slug => {
    const newDecks = decks.slice()
    /* api call */
    setDecks(newDecks.filter(e => e.slug !== slug))
  }

  React.useEffect(() => {
    if (decks.length === 0 && deletionMode) {
      setDeletionMode(false)
    }
  }, [decks, deletionMode])

  return (
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
              featured={el.featured}
              category={el.category}
              slug={el.slug}
              deletionMode={deletionMode}
              handleDelete={handleDelete}
            />
          ))}
          <ActionCard to="/decks/create" backgroundColor={'#ffbd45'}>
            <p>Stwórz nową talię</p>
          </ActionCard>
        </Grid>
      </Box>
    </Container>
  )
}
