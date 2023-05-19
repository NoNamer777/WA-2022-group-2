const cors = require('cors');
const ConfigService = require('../services/config.service');

function corsMiddleWare() {
  const corsOptions = {
    origin: ConfigService.instance().config.server.allowedOrigins,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
  };

  return cors(corsOptions);
}

module.exports = corsMiddleWare;
