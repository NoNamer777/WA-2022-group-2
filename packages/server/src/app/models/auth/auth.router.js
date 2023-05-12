const express = require('express')
const limiter = require('express-rate-limit')
const { matchedData } = require('express-validator')
const AuthController = require('./auth.controller')
const { authValidation } = require('./auth.validation')
const UserController = require('../user/user.controller')
const { cookieJwtAuth } = require('../../middleware/cookie-jwt-auth')
const JwtService = require('../../services/jwt.service')

const router = express.Router()

// On the login and register routes, allow maximum 3 requests per 5 minutes
const authLimiter = limiter({
  windowMs: 5 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false
})

router.get('/', cookieJwtAuth, async (request, response, next) => {
  try {
    response.send({ user: await UserController.instance().getById(request.user.id) })
  } catch (error) {
    next(error)
  }
})

router.post('/', authLimiter, authValidation, async (request, response, next) => {
  try {
    const user = await AuthController.instance().auth(matchedData(request))
    const token = JwtService.instance().generateToken(user.toJSON(), '8h')

    const expiryDate = new Date(Date.now() + 60 * 60 * 8000) // 8 hour
    response.cookie('auth-token', token, { expires: expiryDate })

    response.status(200).send({ user, message: `Welkom terug ${user.username}! 😎` })
  } catch (error) {
    next(error)
  }
})

router.post('/logout', async (request, response, next) => {
  try {
    response.clearCookie('auth-token')
    response.send({ message: 'Tot de volgende keer! 👋' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
