const { v4: createUuid } = require('uuid')
const { User } = require('../../models')
const { InvalidArgumentException } = require('../../exceptions')

module.exports = class UserCreateController {
  userRepository
  passwordEncrypter

  constructor (userRepository, passwordEncrypter) {
    this.userRepository = userRepository
    this.passwordEncrypter = passwordEncrypter
  }

  async execute (req, res) {
    const { username, password } = req.body

    try {
      const user = User.create(createUuid(), username,
        this.passwordEncrypter.encrypt(password))

      this.userRepository.save(user)

      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof InvalidArgumentException) {
        return res.status(422).json({
          error: error.message || error.name,
        })
      }

      return res.status(500).json({
        error: 'Unexpected exception',
      })
    }
  }
}
