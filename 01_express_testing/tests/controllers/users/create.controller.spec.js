const { UserCreateController } = require('../../../src/controllers')
const { PasswordEncrypter } = require('../../../src/utils')

const userRepositoryMock = require(
  '../../__mocks__/user/user-repository.mock')
const apiRequestMock = require(
  '../../__mocks__/shared/api-request.mock')
const apiResponseMock = require(
  '../../__mocks__/shared/api-response.mock')

describe('UserCreateController', function () {
  const passwordEncrypter = new PasswordEncrypter()

  beforeEach(() => {
    userRepositoryMock.save.mockClear()
  })

  it('should return user if valid data', function () {
    const username = 'info@domingollanes.me',
      password = '123456'

    const controller = new UserCreateController(userRepositoryMock,
      passwordEncrypter)

    const hashedPassword = passwordEncrypter.encrypt(password)

    const requestMock = apiRequestMock({ username, password })
    const responseMock = apiResponseMock()

    controller.execute(requestMock, responseMock)

    expect(controller).toBeDefined()
    expect(userRepositoryMock.save).toBeCalledTimes(1)
    expect(userRepositoryMock.save).
      toBeCalledWith(
        expect.objectContaining({ username, password: hashedPassword }))
    expect(userRepositoryMock.save).
      toReturnWith(
        expect.objectContaining({ username, password: hashedPassword }))
    expect(responseMock.status).toBeCalledTimes(1)
    expect(responseMock.status).toBeCalledWith(201)
    expect(responseMock.json).toBeCalledTimes(1)
    expect(responseMock.json).
      toBeCalledWith(
        expect.objectContaining({ username, password: hashedPassword }))
  })

  it('should return error 422 if not valid data', function () {
    const username = 'infodomingollanes.me',
      password = '123456'

    const controller = new UserCreateController(userRepositoryMock,
      passwordEncrypter)

    const requestMock = apiRequestMock({ username, password })
    const responseMock = apiResponseMock()

    controller.execute(requestMock, responseMock)

    expect(controller).toBeDefined()
    expect(userRepositoryMock.save).not.toBeCalled()
    expect(responseMock.status).toBeCalledTimes(1)
    expect(responseMock.status).toBeCalledWith(422)
    expect(responseMock.json).toBeCalledTimes(1)
    expect(responseMock.json).
      toBeCalledWith(
        expect.objectContaining({ error: expect.any(String) }))
  })

  it('should return error 500 if save fails', function () {
    const username = 'info@domingollanes.me',
      password = '123456'

    const errorUserRepositoryMock = userRepositoryMock
    errorUserRepositoryMock.save.mockImplementationOnce(
      () => {throw new Error()})

    const controller = new UserCreateController(errorUserRepositoryMock,
      passwordEncrypter)

    const requestMock = apiRequestMock({ username, password })
    const responseMock = apiResponseMock()

    controller.execute(requestMock, responseMock)

    expect(controller).toBeDefined()
    expect(responseMock.status).toBeCalledTimes(1)
    expect(responseMock.status).toBeCalledWith(500)
    expect(responseMock.json).toBeCalledTimes(1)
    expect(responseMock.json).
      toBeCalledWith({
        error: 'Unexpected exception',
      })
  })
})
