const express = require('express')
const usersRouter = require('./models/user/user.controller')

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', usersRouter)

module.exports = app
