const { UserGetController } = require(
  '../../../src/controllers')

const userRepositoryMock = require(
  '../../__mocks__/user/user-repository.mock')
const apiRequestMock = require(
  '../../__mocks__/shared/api-request.mock')
const apiResponseMock = require(
  '../../__mocks__/shared/api-response.mock')
const { UserNotFoundException } = require('../../../src/models/user/exceptions')

describe('UserGetController', function () {
  beforeEach(() => {
    userRepositoryMock.findById.mockClear()
  })

  it('should return user if id exists', function () {
    const id = 'e1d8cb2c-fd15-4809-a261-14530dab7915'

    const controller = new UserGetController(userRepositoryMock)

    const requestMock = apiRequestMock(null, { id })
    const responseMock = apiResponseMock()

    controller.execute(requestMock, responseMock)

    expect(controller).toBeDefined()
    expect(userRepositoryMock.findById).toBeCalledTimes(1)
    expect(userRepositoryMock.findById).
      toBeCalledWith(id)
    expect(userRepositoryMock.findById).
      toReturnWith(
        expect.objectContaining({ id }))
    expect(responseMock.status).toBeCalledTimes(1)
    expect(responseMock.status).toBeCalledWith(200)
    expect(responseMock.json).toBeCalledTimes(1)
    expect(responseMock.json).
      toBeCalledWith(
        expect.objectContaining({ id }))
  })

  it('should return error 404 if not valid data', function () {
    const id = 'e1d8cb2c-fd15-4809-a261-14530dab7915'

    const errorUserRepositoryMock = userRepositoryMock
    errorUserRepositoryMock.findById.mockImplementationOnce(
      () => {throw new UserNotFoundException()})

    const controller = new UserGetController(errorUserRepositoryMock)

    const requestMock = apiRequestMock(null, { id })
    const responseMock = apiResponseMock()

    controller.execute(requestMock, responseMock)

    expect(controller).toBeDefined()
    expect(responseMock.status).toBeCalledTimes(1)
    expect(responseMock.status).toBeCalledWith(404)
    expect(responseMock.send).toBeCalledTimes(1)
  })

  it('should return error 500 if findById fails', function () {
    const id = 'e1d8cb2c-fd15-4809-a261-14530dab7915'

    const errorUserRepositoryMock = userRepositoryMock
    errorUserRepositoryMock.findById.mockImplementationOnce(
      () => {throw new Error()})

    const controller = new UserGetController(errorUserRepositoryMock)

    const requestMock = apiRequestMock(null, { id })
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
