import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'

import { register } from 'services/auth'

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

  const history = useHistory()
  const [registered, setRegistered] = React.useState(false)
  const [toastOpen, setToastOpen] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState('success')
  const [toastMessage, setToastMessage] = React.useState('')

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToastOpen(false)
    if (registered) {
      history.push('/login')
    }
  }

  const [credentials, setCredentials] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = name => event => {
    setCredentials({ ...credentials, [name]: event.target.value })
  }

  const HandleRegister = async () => {
    try {
      const res = await register(credentials.name, credentials.email, credentials.password)
      if (res.status === 202) {
        setToastSeverity('success')
        setToastMessage('Zarejestrowano pomyślnie!')
        setToastOpen(true)
        setRegistered(true)
      }
    } catch (e) {
      if (e.response.status === 400) {
        setToastSeverity('error')
        setToastMessage('Niepoprawne')
        setToastOpen(true)
      } else if (e.response.status === 500) {
        setToastSeverity('error')
        setToastMessage('Błąd połączenia z serwerem.')
        setToastOpen(true)
      }
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.root}>
        <Card className={classes.card}>
          <form>
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                  <Input type="text" placeholder="Imię" onChange={handleChange('name')} />
                </Grid>
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
              <Link to="/login" className={classes.link}>
                <Button>Mam już konto</Button>
              </Link>

              <Button variant="contained" color="primary" onClick={HandleRegister}>
                Zarejestruj się
              </Button>
            </CardActions>
          </form>
        </Card>
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

export default Register
