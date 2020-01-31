import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695c',
    },
    secondary: {
      main: '#43a047',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    a: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  },
})

export default theme
