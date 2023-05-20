FROM node:18-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG SERVER_PORT=8080
ENV SERVER_PORT $SERVER_PORT

EXPOSE $SERVER_PORT

WORKDIR server-app

COPY . .

RUN npm ci && npm run server:build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /server-app/dist/server .

CMD ["node", "main"]
