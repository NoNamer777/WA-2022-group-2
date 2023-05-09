const dotenv = require('dotenv')
const express = require('express')
const usersRouter = require('./models/user/user.router')
const authRouter = require('./models/auth/auth.router')
const ErrorHandlerService = require('./services/error-handler.service')
const corsMiddleware = require('./middleware/cors-middleware')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

// Load environment variables from a different directory
const envPath = path.join(__dirname, 'config', '../../../.env')
dotenv.config({ path: envPath })

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(corsMiddleware)
app.use(cookieParser())

app.use('/api/user', usersRouter)
app.use('/api/auth', authRouter)

app.use(new ErrorHandlerService().handleError)

module.exports = app
