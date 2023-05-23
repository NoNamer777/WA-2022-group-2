FROM node:18-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG SERVER_PORT=8080
ENV SERVER_PORT $SERVER_PORT

EXPOSE $SERVER_PORT

WORKDIR server-app

COPY . .

RUN npm ci && npm run server:build

COPY /packages/server/src/db/migrations /server-app/dist/server/migrations

COPY /packages/server/start.sh package*.json /server-app/dist/server/

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /server-app/dist/server .

RUN npm ci --omit dev

CMD ["sh", "start.sh"]
