const express = require('express')
const UserController = require('../user/user.controller')
const AuthController = require('./auth.controller')
const { authValidation } = require('../auth/auth.validation')
const { matchedData } = require('express-validator')
const router = express.Router()
const JwtService = require('../../services/jwt.service')
const { jwtAuthHeaderValidator } = require('../../middleware/jwt-auth-header-validator')

router.get('/', jwtAuthHeaderValidator, async (request, response, next) => {
  try {
    response.send({ user: await UserController.instance().getById(request.user.id) })
  } catch (error) {
    next(error)
  }
})

router.post('/login', authValidation, async (request, response, next) => {
  try {
    const token = await AuthController.instance().login(matchedData(request))

    response.header('Authorization', `Bearer ${token}`).status(200).send()
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
