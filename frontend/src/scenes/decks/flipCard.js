import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: { marginBottom: 80 },
  card: {
    minWidth: 120,
    minHeight: 150,
    height: '100%',
    cursor: 'pointer',
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

const FlipCard = props => {
  const [flipped, setFlipped] = React.useState(false)

  const classes = useStyles({ ...props, flipped: flipped })
  return (
    <Grid item xs={12} sm={4} md={3} className={classes.root} {...props}>
      <div className={`${classes.perspective} ${classes.card}`} onClick={() => setFlipped(!flipped)}>
        <div className={classes.cardContainer} flipped={flipped}>
          <Card className={classes.front}>
            <CardContent className={classes.content}>
              <Typography variant="h4" component="h4" gutterBottom align="left">
                {props.front}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.back}>
            <CardContent className={classes.content}>
              <Typography variant="h4" component="h4" gutterBottom align="left">
                {props.back}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </Grid>
  )
}

export default FlipCard
