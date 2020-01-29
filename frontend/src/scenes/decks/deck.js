import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    minWidth: 100,
    minHeight: 210,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function Deck(props) {
  const classes = useStyles()

  const color = () => {
    switch (props.category) {
      case 'Computer Science':
        return 'blue'

      case 'Physics':
        return 'green'

      case 'Math':
        return 'red'

      case 'Philosophy':
        return 'purple'

      default:
        return 'yellow'
    }
  }

  return (
    <Grid item xs={12} sm={4} md={3} {...props}>
      <Link underline="none" component={RouterLink} to={`/decks/${props.slug}`}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {props.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.category}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}
