FROM node:18-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 8080

WORKDIR server-app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run server:build

COPY /packages/server/src/db/migrations /server-app/dist/server/migrations

COPY /packages/server/start.sh package*.json /server-app/dist/server/

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /server-app/dist/server .

RUN npm ci --omit dev

CMD ["sh", "start.sh"]
