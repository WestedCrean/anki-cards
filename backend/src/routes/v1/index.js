const express = require("express")
const authRoute = require("./auth.route")
const userRoute = require("./user.route")
const deckRoute = require("./decks.route")
const router = express.Router()

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/decks", deckRoute)
module.exports = router
