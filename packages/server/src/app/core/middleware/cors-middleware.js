import cors from 'cors';
import { ConfigService } from '../services/index.js';

export function corsMiddleware() {
  const corsOptions = {
    origin: ConfigService.instance().config.server.allowedOrigins || [],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
  };

  return cors(corsOptions);
}
