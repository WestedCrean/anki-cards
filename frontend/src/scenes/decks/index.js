import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

export default function DeckView() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="left">
          Twoje konto
        </Typography>

        <Typography variant="h6" component="p" gutterBottom align="left">
          Imię
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="left">
          email
        </Typography>
      </Box>
    </Container>
  )
}
