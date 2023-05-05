let cors = require('cors')

let allowedOrigin = ['http://localhost:5173', 'http://127.0.0.1:5173']

// @todo update origins for production
if (process.env.NODE_ENV === 'production') {
  allowedOrigin = ''
}

const corsOptions = {
  origin: allowedOrigin,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}

const corsMiddleware = cors(corsOptions)

module.exports = corsMiddleware
