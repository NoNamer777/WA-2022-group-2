const express = require('express')
const UserController = require('../user/user.controller')
const AuthController = require('./auth.controller')
const { authValidation } = require('../auth/auth.validation')
const { matchedData } = require('express-validator')
const router = express.Router()
const JwtService = require('../../services/jwt.service')
const { cookieJwtAuth } = require('../../middleware/cookie-jwt-auth')

router.get('/', cookieJwtAuth, async (request, response, next) => {
  try {
    response.send({ user: await UserController.instance().getById(request.user.id) })
  } catch (error) {
    next(error)
  }
})

router.post('/', authValidation, async (request, response, next) => {
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
