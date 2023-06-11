FROM --platform=$BUILDPLATFORM node:18-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk --no-cache --virtual build-dependencies add python3 make g++

WORKDIR server-app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run server:build

COPY /packages/server/src/db /server-app/dist/server/db

COPY /packages/server/src/public/assets /server-app/dist/server/assets

COPY /packages/server/start.sh package*.json /server-app/dist/server/

RUN npm ci --omit dev

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /server-app/dist/server .

COPY --from=builder /server-app/node_modules node_modules

EXPOSE 8080

CMD ["sh", "start.sh"]
