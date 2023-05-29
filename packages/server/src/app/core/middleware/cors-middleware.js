import cors from 'cors';

export function corsMiddleware() {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');

  const corsOptions = {
    origin: allowedOrigins || [],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
  };

  return cors(corsOptions);
}
