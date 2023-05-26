# WA-2023-group-2: Client

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
(and disable Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Building

To create a build from the server, you can run the following command:

```sh
npm run server:build
```

This will create a production build of the client. When creating a production build of the client,
you can create an environment file `.env.production` in the `environment` folder, and provide it
with the correct environment variables

### Create Docker image

To create a Docker image you can run the following command:

```shell
npm run client:build-docker-image -- --build-arg VITE_JWT_SECRET=secret --build-arg VITE_SERVER_BASE_URL=http://localhost:8080
```

It is important to pass these environment variables now, because of the way how the Dockerfile is set up.
Currently, when a Docker image for the client is created, it will run a build of the client and use
the build output in the final Docker layer to serve the web application via NGINX. Because of how
Vite has implemented the build lifecycle, we need to pass these environment variables now so that
the client environment is set up correctly and that the client behaves as expected.
