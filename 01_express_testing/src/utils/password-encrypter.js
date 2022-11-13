const { createHash } = require('crypto')

module.exports = class PasswordEncrypter {
  encrypt (password) {
    return createHash('sha256').update(password).digest('hex')
  }

  compare (plain, hashed) {
    return hashed === this.encrypt(plain)
  }
}
