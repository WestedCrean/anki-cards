const Joi = require("@hapi/joi")
const { objectId } = require("./custom.validation")

const createDeck = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    cards: Joi.array().items(
      Joi.object({
        front: Joi.string().required(),
        back: Joi.string().required()
      })
    ),
    user: Joi.string().custom(objectId)
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
    userId: Joi.string().custom(objectId)
  })
}

const deleteDeck = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
}

module.exports = {
  createDeck,
  getDecks,
  getDeck,
  deleteDeck
}
