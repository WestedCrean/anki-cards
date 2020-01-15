import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  list: {},
}))

const SideList = props => (
  <div
    className={props.classes.list}
    role="presentation"
    onClick={toggleDrawer(side, false)}
    onKeyDown={toggleDrawer(side, false)}
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
)

function NavBar() {
  const classes = useStyles()
  const { setAuthTokens } = useAuth()

  const [drawerState, setDrawerState] = React.useState(false)

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerState(open)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          onClick={toggleDrawer(true)}
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={drawerState} onClose={toggleDrawer(false)}>
          <SideList />
        </Drawer>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        {setAuthTokens ? (
          <Button color="inherit" onClick={() => setAuthTokens()}>
            Logout
          </Button>
        ) : (
          <Link to="/login" className={classes.link}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  return (
    <AuthContext.Provider value={false}>
      <Router>
        <NavBar />

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Router>
    </AuthContext.Provider>
  )
}
