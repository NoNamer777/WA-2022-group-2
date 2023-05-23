FROM node:18-alpine AS builder

WORKDIR client-app/

COPY package*.json .

RUN npm ci

COPY . .

ARG SERVER_BASE_URL=http://localhost:8080
ENV VITE_SERVER_BASE_URL $SERVER_BASE_URL

ARG JWT_SECRET
ENV VITE_JWT_SECRET $JWT_SECRET

RUN npm run client:build


FROM nginx:1.24-alpine

COPY --from=builder /client-app/dist/client /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
