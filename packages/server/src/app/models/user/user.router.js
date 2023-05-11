const express = require('express')
const UserController = require('./user.controller')
const { postValidation } = require('./user.validation')
const { matchedData } = require('express-validator')
const router = express.Router()
const jwtAuthHeaderValidator = require('../../middleware/jwt-auth-header-validator')

router.get('/', jwtAuthHeaderValidator, async (_, response) => {
  response.send(await UserController.instance().getAll())
})

router.get('/:userId', jwtAuthHeaderValidator, async (request, response) => {
  response.send(await UserController.instance().getById(request.params.userId))
})

router.put('/:userId', jwtAuthHeaderValidator, async (request, response) => {
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

router.delete('/:userId', jwtAuthHeaderValidator, async (request, response) => {
  response.send(await UserController.instance().deleteById(request.params.userId))
})

module.exports = router
