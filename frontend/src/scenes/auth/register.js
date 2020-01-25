import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    padding: '40px',
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  card: {
    minWidth: 275,
    padding: 50,
  },
  actions: {
    justifyContent: 'center',
  },
}))

function Register() {
  const classes = useStyles()
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <form>
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12}>
                <Input type="text" placeholder="Imię" />
              </Grid>
              <Grid item xs={12}>
                <Input type="email" placeholder="Adres e-mail" />
              </Grid>

              <Grid item xs={12}>
                <Input type="password" placeholder="Hasło" />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <Link to="/login" className={classes.link}>
              <Button>Mam już konto</Button>
            </Link>

            <Button variant="contained" color="primary">
              Zarejestruj się
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}

export default Register
