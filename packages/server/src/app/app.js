const express = require('express')
const indexRouter = require('./routes')
const usersRouter = require('./models/user/user.controller')

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/api/user', usersRouter)

module.exports = app
