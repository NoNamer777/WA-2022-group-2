const express = require('express')
const UserController = require('./user.controller')
const { postValidation } = require('./user.validation')
const { matchedData } = require('express-validator')
const router = express.Router()

router.get('/', async (_, response) => {
  response.send(await UserController.instance().getAll())
})

router.get('/:userId', async (request, response) => {
  response.send(await UserController.instance().getById(request.params.userId))
})

router.put('/:userId', async (request, response) => {
  response.send(await UserController.instance().update(request.params.userId, request.body))
})

router.post('/', postValidation, async (request, response) => {
  response.status(201).send(await UserController.instance().create(matchedData(request)))
})

router.delete('/:userId', async (request, response) => {
  response.send(await UserController.instance().deleteById(request.params.userId))
})

module.exports = router
