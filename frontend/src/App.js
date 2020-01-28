import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'
import MaterialLink from '@material-ui/core/Link'

/* auth context */
import { AuthContext, useAuth } from 'context/auth'
import PrivateRoute from './PrivateRoute'

/* scenes */
import Home from 'scenes/home/index'
import Login from 'scenes/auth/login'
import Register from 'scenes/auth/register'
import User from 'scenes/user'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
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
          {' '}
          <Grid item>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" className={classes.title}>
                Moje talie
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" className={classes.title}>
                Moje Konto
              </Typography>
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
  const [authTokens, setAuthTokens] = React.useState(localStorage.getItem('authTokens') || false)

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
          <PrivateRoute exact path="/" component={Home} />
        </Grid>
      </Router>
    </AuthContext.Provider>
  )
}
