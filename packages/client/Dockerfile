FROM node:18-alpine AS builder

WORKDIR client-app/

COPY . .

RUN npm ci && npm run client:build


FROM nginx:1.24-alpine

COPY --from=builder /client-app/dist/client /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
