const express = require('express')
const { matchedData, checkSchema } = require('express-validator')
const AuthController = require('./auth.controller')
const jwtAuthHeaderValidator = require('../../middleware/jwt-auth-header-validator')
const { loginSchema, newUserSchema } = require('../../validation/user.validator')

const router = express.Router()

  }

router.post('/login', checkSchema(loginSchema, ['body']), async (request, response, next) => {
  try {
    const token = await AuthController.instance().login(matchedData(request))

    response.header('Authorization', `Bearer ${token}`).send()
  } catch (error) {
    next(error)
  }
})

router.post('/logout', jwtAuthHeaderValidator, (_request, _response, next) => {
  next()
})

module.exports = router
