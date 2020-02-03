const mongoose = require("mongoose")
const { omit, pick } = require("lodash")

const cardSchema = mongoose.Schema({
  front: String,
  back: String
})

const deckSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    topic: {
      type: String,
      required: false,
      trim: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    cards: [cardSchema]
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
  }
)

deckSchema.methods.toJSON = function () {
  return this.toObject()
}

deckSchema.methods.transform = function () {
  const deck = this
  return pick(deck.toJSON(), ["id", "cards", "name", "topic"])
}

const Deck = mongoose.model("Deck", deckSchema)

module.exports = Deck
