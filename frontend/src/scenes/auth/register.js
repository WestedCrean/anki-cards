import React from 'react'
import { Link } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

function Register() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form>
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Input type="password" placeholder="password again" />
          <Button>Sign Up</Button>
        </form>
        <Link to="/login">Already have an account?</Link>
      </Box>
    </Container>
  )
}

export default Register
