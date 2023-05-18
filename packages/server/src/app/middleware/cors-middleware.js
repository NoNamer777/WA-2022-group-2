const cors = require('cors')

let allowedOrigin = ['http://localhost:5173', 'http://127.0.0.1:5173']

// TODO: Update origins for production
if (process.env.NODE_ENV === 'production') {
  allowedOrigin = ''
}

const corsOptions = {
  origin: allowedOrigin,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
}

const corsMiddleware = cors(corsOptions)

module.exports = corsMiddleware
