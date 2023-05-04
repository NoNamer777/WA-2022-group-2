const express = require('express')
const UserController = require('./user.controller')
const { postValidation, authValidation } = require('./user.validation')
const { matchedData } = require('express-validator')
const router = express.Router()
const JwtService = require('../../services/jwt.service')
const { cookieJwtAuth } = require('../../middleware/cookie-jwt-auth')

router.get('/', cookieJwtAuth, async (_, response) => {
  response.send(await UserController.instance().getAll())
})

router.get('/logged_in', cookieJwtAuth, async (request, response, next) => {
  try {
    response.send({ user: await UserController.instance().getById(request.user.id) })
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', cookieJwtAuth, async (request, response) => {
  response.send(await UserController.instance().getById(request.params.userId))
})

router.put('/:userId', cookieJwtAuth, async (request, response) => {
  response.send(await UserController.instance().update(request.params.userId, request.body))
})

router.post('/', postValidation, async (request, response, next) => {
  try {
    const user = await UserController.instance().create(matchedData(request))

    response
      .status(201)
      .send({ user, message: `Je bent er klaar voor! Laten we een spelletje spellen! 🙌` })
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', cookieJwtAuth, async (request, response) => {
  response.send(await UserController.instance().deleteById(request.params.userId))
})

router.post('/auth', authValidation, async (request, response, next) => {
  try {
    const user = await UserController.instance().auth(matchedData(request))
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
