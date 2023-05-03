const express = require('express')
const UserController = require('./user.controller')
const { postValidation, authValidation } = require('./user.validation')
const { matchedData } = require('express-validator')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { cookieJwtAuth } = require('../../middleware/cookie-jwt-auth')

router.get('/', cookieJwtAuth, async (_, response) => {
  response.send(await UserController.instance().getAll())
})

router.get('/:userId', cookieJwtAuth, async (request, response) => {
  response.send(await UserController.instance().getById(request.params.userId))
})

router.put('/:userId', cookieJwtAuth, async (request, response) => {
  response.send(await UserController.instance().update(request.params.userId, request.body))
})

router.post('/', postValidation, async (request, response) => {
  response.status(201).send(await UserController.instance().create(matchedData(request)))
})

router.delete('/:userId', cookieJwtAuth, async (request, response) => {
  response.send(await UserController.instance().deleteById(request.params.userId))
})

router.post('/auth', authValidation, async (request, response) => {
  const user = await UserController.instance().auth(matchedData(request))

  const token = jwt.sign(user.toJSON(), 'MY_SECRET', { expiresIn: '1h' })
  const expiryDate = new Date(Date.now() + 60 * 60 * 8000) // 8 hour
  response.cookie('authToken', token, { expires: expiryDate, httpOnly: true })

  response.status(200).send(user)
})

module.exports = router
