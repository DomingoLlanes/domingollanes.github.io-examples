const { UserCreateController, UserGetController } = require('../../controllers')
const { UserRepository } = require('../../repositories')
const { PasswordEncrypter } = require('../../utils')
module.exports = (router) => {
  router.get('/users/:id', async (req, res) => {
    const userRepository = new UserRepository()
    const controller = new UserGetController(userRepository)

    return controller.execute(req, res)
  })

  router.post('/users/', async (req, res) => {
    const userRepository = new UserRepository()
    const passwordEncrypter = new PasswordEncrypter()
    const controller = new UserCreateController(userRepository,
      passwordEncrypter)

    return controller.execute(req, res)
  })

  return router
}
