import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
    overflowY: 'scroll',
    padding: '1rem',
  },
  back: {
    height: 210,
    width: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'rotateY(180deg)',
    overflowY: 'scroll',
    padding: '1rem',
  },
  cardTypography: {
    fontWeight: 400,
  },
  perspective: {
    perspective: 1000,
  },
})
const Content = ({ classes, side, ...props }) => (
  <Card className={classes[side]}>
    <CardContent>
      <Typography variant="h6" className={classes.cardTypography}>
        {props.children}
      </Typography>
    </CardContent>
  </Card>
)

const FlipCard = props => {
  const [flipped, setFlipped] = React.useState(false)

  const classes = useStyles({ ...props, flipped: flipped })
  return (
    <Grid item xs={12} sm={4} md={3} className={classes.root} {...props}>
      <div className={`${classes.perspective} ${classes.card}`} onClick={() => setFlipped(!flipped)}>
        <div className={classes.cardContainer} flipped={flipped}>
          {['front', 'back'].map(side => (
            <Content classes={classes} side={side}>
              {props[side]}
            </Content>
          ))}
        </div>
      </div>
    </Grid>
  )
}

export default FlipCard
