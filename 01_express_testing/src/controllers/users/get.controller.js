const { UserNotFoundException } = require('../../models/user/exceptions')

module.exports = class UserGetController {
  userRepository

  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (req, res) {
    const { id } = req.params

    try {
      const user = this.userRepository.findById(id)

      return res.status(200).json(user)
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).send()
      }

      return res.status(500).json({
        error: 'Unexpected exception',
      })
    }
  }
}
