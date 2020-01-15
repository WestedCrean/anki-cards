import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import ProTip from './ProTip'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://wikflis.me/">
        Wiktor Flis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Anki Cards
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          Superpamięć w zasięgu ręki
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}
