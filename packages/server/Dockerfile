FROM node:18-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=8080
ENV PORT $PORT

ARG HOST=0.0.0.0
ENV HOST $HOST

EXPOSE $PORT

WORKDIR server-app

COPY . .

RUN npm ci && npm run server:build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /server-app/dist/server .

CMD ["node", "main"]
