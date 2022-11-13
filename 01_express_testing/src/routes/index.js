const express = require('express')

const usersRoutes = require('./users')

let router = express.Router()

router = usersRoutes(router)

module.exports = router
