const express = require('express')
const { authValidation } = require('../auth/auth.validation')
const { matchedData } = require('express-validator')
const AuthController = require('./auth.controller')
const jwtAuthHeaderValidator = require('../../middleware/jwt-auth-header-validator')

const router = express.Router()

  }

router.post('/login', authValidation, async (request, response, next) => {
  try {
    const token = await AuthController.instance().login(matchedData(request))

    response.header('Authorization', `Bearer ${token}`).status(200).send()
  } catch (error) {
    next(error)
  }
})

router.post('/logout', jwtAuthHeaderValidator, (_request, _response, next) => {
  next()
})

module.exports = router
