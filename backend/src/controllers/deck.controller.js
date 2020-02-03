const httpStatus = require("http-status")
const catchAsync = require("../utils/catchAsync")
const { deckService } = require("../services")

const createDeck = catchAsync(async (req, res) => {
  const deck = await deckService.createDeck(req.body)
  res.status(httpStatus.CREATED).send(deck.transform())
})

const getDecks = catchAsync(async (req, res) => {
  const decks = await deckService.getDecks(req.user)
  const response = decks.map(deck => deck.transform())
  res.send(response)
})

const getDeck = catchAsync(async (req, res) => {
  const deck = await deckService.getDeckById(req.user, req.params.deckId)
  console.log({ deck: Object.keys(deck) })
  res.send(deck.transform())
})

const deleteDeck = catchAsync(async (req, res) => {
  await deckService.deleteDeck(req.user, req.params.deckId)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  createDeck,
  getDecks,
  getDeck,
  deleteDeck
}
