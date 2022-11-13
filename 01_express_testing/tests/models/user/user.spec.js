const { v4: createUuid } = require('uuid')
const { User } = require('../../../src/models')
const { InvalidArgumentException } = require('../../../src/exceptions')

describe('User Model', function () {
  it('should return instance of User on create', function () {
    const user = User.create(createUuid(), 'info@domingollanes.me', '123456')

    expect(user).toBeInstanceOf(User)
  })

  it('should throw an InvalidArgumentException error if email is not valid',
    function () {
      expect(() => { User.create(createUuid(), 'any', '123456') }).
        toThrow(InvalidArgumentException)

      try {
        User.create(createUuid(), 'any', '123456')
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidArgumentException)
      }
    })
})
