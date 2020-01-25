import fetchApi from './fetchApi'

const endpoints = {
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
}

export const login = (email, password) =>
  fetchApi(
    'post',
    endpoints.login,
    {},
    {
      email,
      password,
    },
  )

export const refresh = (token, user) =>
  fetchApi(
    'post',
    endpoints.refresh,
    { token, user },
    {
      Authorization: null,
    },
  )

export const revoke = tokens => fetchApi('post', endpoints.revoke, { tokens })
