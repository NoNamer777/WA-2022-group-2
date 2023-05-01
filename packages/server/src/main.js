#!/usr/bin/env node

const app = require('./app/app')
const http = require('http')

// Get port and hostname from environment and store in Express
const host = process.env.SERVER_HOST || 'localhost'
const port = normalizePort(process.env.SERVER_PORT || '8080')
app.set('port', port)
app.set('hostname', host)

const server = http.createServer(app)

server.listen(port, host)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10)

  // named pipe
  if (isNaN(port)) return val

  // port number
  if (port >= 0) return port
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') throw error

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  console.info(`Server is Listening on http://${host}:${port}/`)
}
