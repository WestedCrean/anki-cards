const roles = ["user", "admin"]

const roleRights = new Map()
roleRights.set("user", ["getDecks", "manageDecks"])
roleRights.set("admin", ["getUsers", "manageUsers", "getDecks", "manageDecks"])

module.exports = {
  roles,
  roleRights
}
