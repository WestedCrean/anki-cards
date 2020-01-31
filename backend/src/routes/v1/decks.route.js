const express = require("express")
const auth = require("../../middlewares/auth")
const validate = require("../../middlewares/validate")
const deckValidation = require("../../validations/deck.validation")
const deckController = require("../../controllers/deck.controller")

const router = express.Router()

router
  .route("/")
  .post(
    auth("manageDecks"),
    validate(deckValidation.createDeck),
    deckController.createDeck
  )
  .get(
    auth("getDecks"),
    validate(deckValidation.getDecks),
    deckController.getDecks
  )

router
  .route("/:deckId")
  .get(
    auth("getDecks"),
    validate(deckValidation.getDeck),
    deckController.getDeck
  )
  .delete(
    auth("manageDecks"),
    validate(deckValidation.deleteDeck),
    deckController.deleteDeck
  )

module.exports = router
