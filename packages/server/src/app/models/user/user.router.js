const express = require('express')
const { matchedData, checkSchema } = require('express-validator')
const UserController = require('./user.controller')
const entityIdValidator = require('../../middleware/entity-id.validator')
const jwtAuthHeaderValidator = require('../../middleware/jwt-auth-header-validator')
const { userSchema, newUserSchema } = require('../../validation/user.validator')

const router = express.Router()

router.get('/', jwtAuthHeaderValidator, async (_, response) => {
  const allUsers = await UserController.instance().getAll()

  response.send(allUsers)
})

router.get(
  '/:userId',
  jwtAuthHeaderValidator,
  entityIdValidator('userId', 'User'),
  async (request, response, next) => {
    const userId = request.params.userId
    try {
      response.send(await UserController.instance().getById(userId))
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:userId',
  jwtAuthHeaderValidator,
  checkSchema(userSchema, ['body']),
  entityIdValidator('userId', 'User'),
  async (request, response, next) => {
    const userId = request.params.userId
    const userData = matchedData(request)

    try {
      const updatedUser = await UserController.instance().update(userId, userData)

      response.send(updatedUser)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  jwtAuthHeaderValidator,
  checkSchema(newUserSchema, ['body']),
  async (request, response, next) => {
    const userData = matchedData(request)

    try {
      const createdUser = await UserController.instance().create(userData)

      response.status(201).send(createdUser)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:userId',
  jwtAuthHeaderValidator,
  entityIdValidator('userId', 'User'),
  async (request, _response, next) => {
    const userId = request.params.userId

    try {
      await UserController.instance().deleteById(userId)
      next()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
