const express = require('express')
const usersRouter = require('./models/user/user.router')
const ErrorHandlerService = require('./services/error-handler.service')

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', usersRouter)

app.use(new ErrorHandlerService().handleError)

module.exports = app