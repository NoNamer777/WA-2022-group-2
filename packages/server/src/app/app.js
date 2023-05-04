const express = require('express')
const usersRouter = require('./models/user/user.router')
const ErrorHandlerService = require('./services/error-handler.service')
const corsMiddleware = require('./middleware/cors-middleware')
const cookieParser = require('cookie-parser')
const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(corsMiddleware)
app.use(cookieParser())

app.use('/api/user', usersRouter)

app.use(new ErrorHandlerService().handleError)

module.exports = app
