import axios from 'axios'

const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  decks: '/decks',
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

export const getDecks = async token =>
  await Api.get(endpoints.decks, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const getSingleDeck = async (token, slug) =>
  await Api.get(endpoints.decks + '/' + slug, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const createDeck = async (token, slug) =>
  await Api.get(endpoints.decks + '/' + slug, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const deleteSingleDeck = async (token, slug) =>
  await Api.delete(endpoints.decks + '/' + slug, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const uploadDeck = async (token, file) =>
  await Api.post(endpoints.decks, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
