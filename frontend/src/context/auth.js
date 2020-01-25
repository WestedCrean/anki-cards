import { createContext, useContext } from 'react'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}
//- -------------------------
import React from 'react'

// Context
const AuthState = React.createContext()
const AuthDispatch = React.createContext()

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'Login':
      return {
        ...state,
        number: state.number + 1,
      }
    case 'Logout':
      return {
        ...state,
        number: state.number + 1,
      }
    default:
      return state
  }
}

// Provider
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, { number: 0 })

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

// Export
export const Counter = {
  State,
  Dispatch,
  Provider,
}
