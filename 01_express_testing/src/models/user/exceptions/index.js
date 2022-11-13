module.exports = {
  UserNotFoundException: class UserNotFoundException extends Error {
    constructor (message) {
      super(message)
      this.name = this.constructor.name
    }
  },
}
