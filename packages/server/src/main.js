#!/usr/bin/env node

import { createServer } from 'http';
import { DatabaseService, initializeApp } from './app/index.js';

(async () => {
  let wastedApp;

  try {
    wastedApp = await initializeApp();
  } catch (error) {
    console.error('Something went wrong while trying to initialize the server.', error);
    process.exit(1);
    return;
  }

  const host = '0.0.0.0';
  const port = 8080;

  wastedApp.app.set('hostname', host);
  wastedApp.app.set('port', port);

  const server = createServer(wastedApp.app);

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

  process.on('SIGINT', async () => {
    await shutdown(server);
  });

  process.on('SIGTERM', async () => {
    await shutdown(server);
  });

  async function shutdown(server) {
    console.info('Shutting down server...');
    await DatabaseService.instance().sequelizeInstance.close();

    server.close((error) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      process.exit(0);
    });
  }
})();
