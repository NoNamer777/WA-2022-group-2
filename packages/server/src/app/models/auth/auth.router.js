const express = require('express')
const limiter = require('express-rate-limit')
const { matchedData, checkSchema } = require('express-validator')
const AuthController = require('./auth.controller')
const confirmPasswordValidator = require('../../middleware/confirm-password.validator')
const { loginSchema, newUserSchema } = require('../../validation/user.validator')

const router = express.Router()

// On the login and register routes, allow maximum 10 requests per 5 minutes
const authLimiter = limiter({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
})

router.post(
  '/register',
  authLimiter,
  checkSchema(newUserSchema, ['body']),
  confirmPasswordValidator,
  async (request, response, next) => {
    try {
      const createdUser = await AuthController.instance().register(matchedData(request))

      response.status(201).json(createdUser)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/login',
  authLimiter,
  checkSchema(loginSchema, ['body']),
  async (request, response, next) => {
    try {
      const token = await AuthController.instance().login(matchedData(request))

      response.header('Authorization', `Bearer ${token}`).send()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
