import Api from './api'

const endpoints = {
    decks: '/decks',
    singleDeck: (deckId) => `/decks/${deckId}`
}


export const createDeck = async (token, data) =>
    await Api.post(endpoints.decks, data, {
        headers: {
            Authorization: `Bearer ${token.access.token}`,
        },
    })

export const deleteDeck = async (token, deckId) =>
    await Api.delete(endpoints.singleDeck(deckId), {
        headers: {
            Authorization: `Bearer ${token.access.token}`,
        },
    })

export const getSingleDeck = async (token, deckId) =>
    await Api.get(endpoints.singleDeck(deckId), {
        headers: {
            Authorization: `Bearer ${token.access.token}`,
        },
    })
export const getDecks = async token =>
    await Api.get(endpoints.decks, {
        headers: {
            Authorization: `Bearer ${token.access.token}`,
        },
    })