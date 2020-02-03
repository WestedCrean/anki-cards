const Joi = require("@hapi/joi")
const { objectId } = require("./custom.validation")

const createDeck = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    topic: Joi.string(),
    cards: Joi.array().items(
      Joi.object({
        front: Joi.string().required(),
        back: Joi.string().required()
      })
    ),
  })
}

const getDecks = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
}

const getDeck = {
  params: Joi.object().keys({
    deckId: Joi.string().custom(objectId)
  })
}

const deleteDeck = {
  params: Joi.object().keys({
    deckId: Joi.string().custom(objectId)
  })
}

module.exports = {
  createDeck,
  getDecks,
  getDeck,
  deleteDeck
}
