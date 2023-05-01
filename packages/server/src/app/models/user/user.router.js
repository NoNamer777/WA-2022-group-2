const express = require('express')
const UserController = require('./user.controller')
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

router.post('/', async (request, response) => {
  response.status(201).send(await UserController.instance().create(request.body))
})

router.delete('/:userId', async (request, response) => {
  response.send(await UserController.instance().deleteById(request.params.userId))
})

module.exports = router
