import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

import Button from '@material-ui/core/Button'

/* auth context */
import { AuthContext, useAuth } from 'context/auth'
import PrivateRoute from './PrivateRoute'

/* scenes */
import Home from 'scenes/home/index'
import Login from 'scenes/auth/login'
import Register from 'scenes/auth/register'
import User from 'scenes/user'
import Decks from 'scenes/decks'
import SingleDeck from 'scenes/decks/singleDeck'
import CreateDeckView from 'scenes/decks/create'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
    fontSize: '1.2rem',
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  list: {},
}))

function NavBar() {
  const classes = useStyles()
  const { authTokens, setAuthTokens } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <p className={classes.title}>Strona Główna</p>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/decks" style={{ textDecoration: 'none', color: 'inherit' }}>
              <p className={classes.title}>Talie kart</p>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <p className={classes.title}>Twoje konto</p>
            </Link>
          </Grid>
        </Grid>
        {authTokens && (
          <Button color="inherit" onClick={() => setAuthTokens()}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  const [authTokens, setAuthTokens] = React.useState(false)

  const setTokens = token => {
    localStorage.setItem('authTokens', token)
    setAuthTokens(token)
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <NavBar />
        <Grid>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute exact path="/decks/create" component={CreateDeckView} />
          <PrivateRoute exact path="/decks/:deckId" component={SingleDeck} />
          <PrivateRoute exact path="/decks" component={Decks} />
          <PrivateRoute exact path="/" component={Home} />
        </Grid>
      </Router>
    </AuthContext.Provider>
  )
}
