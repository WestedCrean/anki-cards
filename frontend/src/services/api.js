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
      Authorization: `Bearer ${token.access.token}`,
    },
  })

export const getSingleDeck = async (token, slug) =>
  await Api.get(endpoints.decks + '/' + slug, {
    headers: {
      Authorization: `Bearer ${token.access.token}`,
    },
  })

export const createDeck = async (token, data) =>
  await Api.post(endpoints.decks, data, {
    headers: {
      Authorization: `Bearer ${token.access.token}`,
    },
  })

export const deleteSingleDeck = async (token, deckId) =>
  await Api.delete(endpoints.decks + '/' + deckId, {
    headers: {
      Authorization: `Bearer ${token.access.token}`,
    },
  })
