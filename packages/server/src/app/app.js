const express = require('express')
const logger = require('morgan')
const indexRouter = require('./routes')
const usersRouter = require('./models/user/user.controller')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/user', usersRouter)

module.exports = app
