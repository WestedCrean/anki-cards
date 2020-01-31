import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    minWidth: 100,
    minHeight: 210,
    height: '100%',
    cursor: 'pointer',
    backgroundColor: props => props.backgroundColor,
    color: 'white',
  },
  pos: {
    marginBottom: 12,
  },
})

export const ActionCard = props => {
  const classes = useStyles(props)

  return (
    <Grid item xs={12} sm={4} md={3} {...props}>
      <Link underline="none" component={RouterLink} to={props.to}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" styles={{ fontWeight: 500 }} gutterBottom>
              {props.children}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}
/*
export const FileInputCard = props => {
  return (
    <Grid item xs={3}>
      <Card className={classes.card} color="primary">
        <CardActions style={{ height: '100%' }}>
          <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
          <label htmlFor="contained-button-file">
            <Button>
              <AddIcon classes={classes.add} style={{ margin: 'auto' }} />
              <Typography component="span">Dodaj nową talię</Typography>
            </Button>
          </label>
        </CardActions>
      </Card>
    </Grid>
  )
}*/
