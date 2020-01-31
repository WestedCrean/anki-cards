import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Grow from '@material-ui/core/Grow'

const useStyles = makeStyles({
  card: {
    minWidth: 100,
    minHeight: 210,
  },
  pos: {
    marginBottom: 12,
  },
  deleteBtn: {},
})

export default function Deck(props) {
  const classes = useStyles({ deletionMode: props.deletionMode })

  const handleDelete = e => {
    e.preventDefault()
    props.handleDelete(props.slug)
  }

  return (
    <Grid item xs={12} sm={4} md={3} {...props}>
      <Link underline="none" component={RouterLink} to={`/decks/${props.slug}`}>
        <Card className={classes.card}>
          <CardHeader
            action={
              <Grow
                in={props.deletionMode}
                style={{ transformOrigin: '0' }}
                {...(props.deletionMode ? { timeout: 1000 } : {})}
              >
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon className={classes.deleteBtn} deletionMode={props.deletionMode} />
                </IconButton>
              </Grow>
            }
            title={props.title}
            subheader={props.category}
          />
          <CardContent></CardContent>
        </Card>
      </Link>
    </Grid>
  )
}
