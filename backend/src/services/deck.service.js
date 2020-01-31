const httpStatus = require("http-status")
const { pick } = require("lodash")
const AppError = require("../utils/AppError")
const { Deck } = require("../models")
const { getQueryOptions } = require("../utils/service.util")
const userService = require("./user.service")

const createDeck = async deckBody => {
  console.log({ Deck: deckBody })
  const deck = await Deck.create(deckBody)
  return deck
}

const getDecks = async userId => {
  console.log({ user: userId })
  const decks = await Deck.find({ user: userId })
  return decks
}

const getDeckById = async (userId, deckId) => {
  const deck = await Deck.find({ user: userId }).findById(deckId)
  if (!deck) {
    throw new AppError(httpStatus.NOT_FOUND, "Nie znaleziono talii o tym id")
  }
  return user
}

const deleteDeck = async deckId => {
  const deck = await getDeckById(deckId)
  await deck.remove()
  return deck
}

module.exports = {
  createDeck,
  getDecks,
  getDeckById,
  deleteDeck
}
