import axios from 'axios'

const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
}

const Api = axios.create({
  baseURL: 'http://localhost:8080/v1/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const login = async (email, password) =>
  await Api.post(endpoints.login, {
    email,
    password,
  })

export const register = async (name, email, password) =>
  await Api.post(endpoints.register, {
    name,
    email,
    password,
  })
