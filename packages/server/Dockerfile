FROM --platform=$BUILDPLATFORM node:18-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk --no-cache --virtual build-dependencies add python3 make g++

WORKDIR server-app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run server:build

# Copy over database related files
COPY /packages/server/src/db /server-app/dist/server/db

# Copy over some assets
COPY /packages/server/src/public/assets /server-app/dist/server/assets

COPY /documentation/open-api/wasted-open-api-spec.yaml /server-app/dist/server/assets/open-api/

RUN cp node_modules/swagger-ui-dist/swagger-ui-bundle.js* \
    node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js* \
    node_modules/swagger-ui-dist/swagger-ui.css* \
    /server-app/dist/server/assets/open-api/

# Copy over the start script and project configurations
COPY /packages/server/start.sh package*.json /server-app/dist/server/

RUN npm ci --omit dev

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /server-app/dist/server .

COPY --from=builder /server-app/node_modules node_modules

EXPOSE 8080

CMD ["sh", "start.sh"]
