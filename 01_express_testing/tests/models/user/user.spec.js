const { v4: createUuid } = require('uuid')
const { User } = require('../../../src/models')
const { InvalidArgumentException } = require('../../../src/exceptions')

describe('User Model', function () {
  const validUserNames = [
    'info@domingollanes.me',
    'domingo@gmail.com',
    'info+test@domingollanes.me',
  ]

  const invalidUserNames = [
    { username: 'infodomingollanes.me' },
    { username: 'domingo@gmailcom' },
    { username: 'info+test@domingollanes._me' },
  ]

  it.each(validUserNames)(
    'should return an instance of User with username %s',
    (username) => {
      const user = User.create(createUuid(), username, '123456')

      expect(user).toBeInstanceOf(User)
    })

  it.each(invalidUserNames)(
    'should throw an InvalidArgumentException error if username is $username',
    ({ username }) => {
      expect(
        () => { User.create(createUuid(), username, '123456') }).
        toThrow(InvalidArgumentException)

      try {
        User.create(createUuid(), username, '123456')
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidArgumentException)
      }
    })
})
