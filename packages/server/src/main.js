#!/usr/bin/env node

const http = require('http');
const app = require('./app/app');
const ConfigService = require('./app/services/config.service');

(async () => {
  const wastedApp = await app();

  // Get port and hostname from the config service and store in Express
  const host = ConfigService.instance().config.server.host;
  const port = ConfigService.instance().config.server.port;

  wastedApp.app.set('port', port);
  wastedApp.app.set('hostname', host);

  const server = http.createServer(wastedApp.app);

  server.listen(port, host);
  server.on('listening', () => console.info(`Server is Listening on http://${host}:${port}/`));
  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
})();
