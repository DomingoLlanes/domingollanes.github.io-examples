const { InvalidArgumentException } = require('../../exceptions')
module.exports = class User {
  id
  username
  password

  constructor (
    id, username, password) {
    this.id = id
    this.username = username
    this.password = password

    this.validateUsername()
  }

  static create (id, username, password) {
    return new User(id, username, password)
  }

  validateUsername () {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(this.username)) {
      throw new InvalidArgumentException()
    }
  }
}
