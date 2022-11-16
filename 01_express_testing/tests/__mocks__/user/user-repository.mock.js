module.exports = {
  save: jest.fn((user) => user),
  findById: jest.fn(() => {
    return {
      'id': 'e1d8cb2c-fd15-4809-a261-14530dab7915',
      'username': 'test@domingollanes.me',
      'password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
    }
  }),
}
