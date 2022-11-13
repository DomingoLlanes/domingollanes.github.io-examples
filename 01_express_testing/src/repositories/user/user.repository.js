const data = require('./user.data.json')
const { UserNotFoundException } = require('../../models/user/exceptions')

module.exports = class UserRepository {
  save (user) {
    const object = Object.assign({}, user)
    data.push(object)
    return user
  }

  findById (id) {
    const user = data.find((one) => (one.id === id))

    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }
}
