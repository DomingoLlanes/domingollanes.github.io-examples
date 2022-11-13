module.exports = {
  InvalidArgumentException: class InvalidArgumentException extends Error {
    constructor (message) {
      super(message)
      this.name = this.constructor.name
    }
  },
}
