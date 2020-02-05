import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useAuth } from 'context/auth'

export default function User() {
  const { authTokens } = useAuth()
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="left">
          Twoje konto
        </Typography>

        <Typography variant="h6" component="p" gutterBottom align="left">
          Imię : {authTokens.user.name}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="left">
          Email : {authTokens.user.email}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="left">
          Identyfikator uzytkownika : {authTokens.user.id}
        </Typography>
      </Box>
    </Container>
  )
}
