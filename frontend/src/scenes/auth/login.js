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

//import authContext from '../store'
import { login } from 'services/api.js'

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

function Login() {
  const classes = useStyles()

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = name => event => {
    console.log(credentials)
    setCredentials({ ...credentials, [name]: event.target.value })
  }

  const HandleLogin = e => {
    fetch('/v1/api/auth/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        email: credentials.email,
        passwrod: credentials.password,
      }), // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .catch(e => console.log(e))
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <form>
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12}>
                <Input type="email" placeholder="Adres e-mail" onChange={handleChange('email')} />
              </Grid>

              <Grid item xs={12}>
                <Input type="password" placeholder="Hasło" onChange={handleChange('password')} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <Link to="/register" className={classes.link}>
              <Button>Nie mam konta</Button>
            </Link>
            <Button variant="contained" color="primary" onSubmit={HandleLogin}>
              Zaloguj się
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}

export default Login
