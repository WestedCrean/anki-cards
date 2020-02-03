const httpStatus = require("http-status")
const { pick } = require("lodash")
const AppError = require("../utils/AppError")
const { Deck } = require("../models")
const { getQueryOptions } = require("../utils/service.util")
const userService = require("./user.service")

const createDeck = async (deckBody, user) => {
  const deck = await Deck.create({ ...deckBody, user: user.id })
  return deck
}

const getDecks = async user => {
  const decks = await Deck.find({ user: user.id }, "id name topic")
  return decks
}

const getDeckById = async (user, deckId) => {
  const deck = await Deck.findById(deckId)
  if (!deck) {
    throw new AppError(httpStatus.NOT_FOUND, "Nie znaleziono talii o tym id")
  }
  if (deck.user != user.id) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Znaleziono talię, ale nalezy do innego uzytkownika`
    )
  }
  return deck
}

const deleteDeck = async (user, deckId) => {
  const deck = await getDeckById(user, deckId)
  await deck.remove()
  return deck
}

module.exports = {
  createDeck,
  getDecks,
  getDeckById,
  deleteDeck
}
