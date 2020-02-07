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
import TextField from '@material-ui/core/TextField'
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

  React.useEffect(() => {
    console.log(credentials)
  }, [credentials])

  const handleChange = name => event => {
    setCredentials({ ...credentials, [name]: event.target.value })
  }
  const [validationError, setValidationError] = React.useState({
    name: '',
    email: '',
    password: '',
  })
  const [greedyCheck, setGreedyCheck] = React.useState(false)

  React.useEffect(() => {
    if (greedyCheck) {
      handleValidation()
    }
  }, [credentials, greedyCheck])

  const handleValidation = () => {
    let errs = { ...validationError }
    Object.keys(errs).forEach(e => (errs[e] = ''))
    if (credentials.name === '') {
      credentials.name = 'Podaj swoje imię'
    }
    if (credentials.email === '') {
      errs.email = 'Podaj swój adres email'
    } else if (
      !credentials.email
        .toLowerCase()
        .match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      errs.email = 'Podaj adres email w prawidłowym formacie'
    }
    if (credentials.password === '') {
      errs.password = 'Podaj hasło'
    }
    setValidationError(errs)
    return errs
  }

  const HandleRegister = async e => {
    if (e) {
      e.preventDefault()
    }
    const err = handleValidation()
    if (Object.values(err).filter(e => e !== '').length === 0) {
      try {
        const res = await register(credentials.name, credentials.email, credentials.password)
        setToastSeverity('success')
        setToastMessage('Zarejestrowano pomyślnie!')
        setToastOpen(true)
        setRegistered(true)
      } catch (e) {
        if (e.response.status === 400) {
          console.log({ eerror: e.response })
          setToastSeverity('error')
          if (e.response.data.message === 'password must be at least 8 characters') {
            setToastMessage('Hasło musi zawierać conajmniej 8 znaków')
          } else if (e.response.data.message === 'password must contain at least 1 letter and 1 number') {
            setToastMessage('Hasło musi zawierać conajmniej 1 literę i 1 cyfrę')
          } else if (e.response.data.message === 'Email already taken') {
            setToastMessage('Email jest juz w uzyciu')
          } else {
            setToastMessage('Niepoprawne dane')
          }

          setToastOpen(true)
        } else if (e.response.status === 500) {
          setToastSeverity('error')
          setToastMessage('Błąd połączenia z serwerem.')
          setToastOpen(true)
        }
      }
    } else {
      setGreedyCheck(true)
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.root}>
        <Card className={classes.card}>
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={validationError.name}
                    helperText={validationError.name}
                    type="text"
                    placeholder="Imię"
                    onChange={handleChange('name')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Adres e-mail"
                    error={validationError.email}
                    helperText={validationError.email}
                    onChange={handleChange('email')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Hasło"
                    error={validationError.password}
                    helperText={validationError.password}
                    onChange={handleChange('password')}
                  />
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

              <Button variant="contained" color="primary" onClick={e => HandleRegister(e)}>
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
