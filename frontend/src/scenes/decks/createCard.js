import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  root: { marginBottom: 80 },
  card: {
    minWidth: 120,
    minHeight: 150,
    height: '100%',
  },
  cardContainer: {
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
    transform: props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'),
  },
  front: {
    height: 210,
    width: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    transform: 'rotateY(0deg)',
  },
  back: {
    height: 210,
    width: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'rotateY(180deg)',
  },
  content: {},
  perspective: {
    perspective: 1000,
  },
})

const SideInput = props => (
  <Grid container alignContent={'center'} alignItems={'center'} style={{ height: 200 }}>
    <Grid xs={12} item style={{ paddingBottom: 16 }}>
      <TextField
        multiline
        rowsMax="10"
        placeholder={`Ustaw treść ${props.side}`}
        value={props.inputValue}
        onChange={props.onInputChange}
        fullWidth
      />
    </Grid>
  </Grid>
)

const CreateCard = props => {
  const [flipped, setFlipped] = React.useState(false)
  const [cardFinished, setCardFinished] = React.useState(false)
  const [cardContent, setCardContent] = React.useState({
    front: '',
    back: '',
  })
  const handleNewCard = () => {
    props.onaddnewcard(cardContent)
    setCardContent({ front: '', back: '' })
  }

  const handleChange = name => event => {
    setCardContent({ ...cardContent, [name]: event.target.value })
  }
  React.useEffect(() => {
    const { front, back } = cardContent
    if (front !== '' && back !== '') {
      setCardFinished(true)
    } else {
      if (cardFinished) {
        setCardFinished(false)
      }
    }
  }, [cardContent])

  const classes = useStyles({ ...props, flipped: flipped })
  return (
    <Grid item xs={12} sm={4} md={3} className={classes.root} {...props}>
      <div className={`${classes.perspective} ${classes.card}`}>
        <div className={classes.cardContainer} flipped={flipped}>
          <Card className={classes.front}>
            <CardContent className={classes.content}>
              <SideInput
                inputValue={cardContent.front}
                side={'awersu'}
                onInputChange={handleChange('front')}
              />
            </CardContent>
          </Card>
          <Card className={classes.back}>
            <CardContent className={classes.content}>
              <SideInput
                inputValue={cardContent.back}
                side={'rewersu'}
                onInputChange={handleChange('back')}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Button fullWidth color="primary" variant="outlined" onClick={() => setFlipped(!flipped)}>
        Obróć kartę
      </Button>
      <Button
        fullWidth
        disabled={!cardFinished}
        variant="contained"
        color="primary"
        style={{ marginTop: 10 }}
        onClick={handleNewCard}
      >
        Dodaj kartę
      </Button>
    </Grid>
  )
}

export default CreateCard
