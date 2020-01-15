import React from 'react'
import { Link } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

function Login() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form>
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Button>Sign In</Button>
        </form>
        <Link to="/signup">Don't have an account?</Link>
      </Box>
    </Container>
  )
}

export default Login
