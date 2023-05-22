FROM node:18-alpine AS builder

WORKDIR client-app/

COPY . .

RUN npm ci && npm run client:build


FROM nginx:1.24-alpine

COPY --from=builder /client-app/dist/client /use/share/nginx/html

ARG CLIENT_PORT=5173
ENV CLIENT_PORT $CLIENT_PORT

EXPOSE $CLIENT_PORT

CMD ["nginx", "-g", "daemon off;"]
