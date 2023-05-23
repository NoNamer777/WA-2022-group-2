# WA-2023-group-2

This project consists of 2 projects, a front-end client web application in Vue and a back-end server application in
Express with Sequalize, and it is maintained by the following members:

| Name                | Student nr. |
| ------------------- | ----------- |
| Oscar Wellner       | 21144192    |
| Ahmed Benhajar      | 21024154    |
| Marjo Salo          | 21146942    |
| Jeniffer Goudswaard | 21155496    |

## Developing

Before you start developing, you should install the project dependencies by running the following command in a terminal
which is opened in the project root:

```shell
npm install
```

### Configuration

This server uses a config file to set up some aspects of the application. You must copy the template
found [here](./environment/config-template.json) and rename the copied file to `config.json`.
Below here follows an example of what the config may look like:

```json5
{
  // Whether the server runs in production mode, thus changing some values or processes
  production: false,
  jwt: {
    // The JWT secret, used to encode and decode JWT tokens. NOTE: This value must be identical to
    // the environment variable `VITE_JWT_SECRET`
    token: 'My super secret token'
  },
  server: {
    // The host address of the server
    host: 'localhost',

    // The port on the host on which the server runs on
    port: 8080,

    // The location of the database config
    databaseConfigPath: './environment/database.json',

    // Origins that are allowed to connect to the server via the CORS settings
    allowedOrigins: ['http://localhost:5173']
  }
}
```

Besides this configuration file, the client and server applications use environment variables to
configure its values and processes depending on the environment that the application is running in.
By default, the client and server applications look for an `.env` file inside the `./environment`
folder. You'll also find a template there which you can copy and rename to `.env`. An example of
how such a file would look like is as followed:

```
# Server variables

# This variables determines where the server and client can find their environment variables. This
# is usually already passed via the cli (server) or in the Vite configuration file (client), but
# it can't do any harm to declare it also in this file.
ENV_PATH=./environment/.env

# This variable determines where the server will look for its configuration file. This path will be
# relative to from where the server process is run from.
CONFIG_PATH=./environment/config.json

# Client variables

# This variable determine where the client sends api requests to. This address should reuse the
# `host` and `port` values used in the server configuration
VITE_SERVER_BASE_URL=http://localhost:8080

# This variable is used to decode the received JWT token in the web application and needs to be
# identical to the secret passed in the server configuration file (`config.json#jwt.secret`)
VITE_JWT_SECRET=my super secret jwt secret

```

After that you can find the instructions for the different projects on how to get the projects started

| Project | location                          |
| ------- | --------------------------------- |
| Client  | [Here](packages/client/README.md) |
| Server  | [Here](packages/server/README.md) |

### ESLint and Prettier

This project is working with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
To make your editor work with these tools, please check [here](https://prettier.io/docs/en/editors.html) to make sure
Prettier formats your files after every save. For ESLint, check
[here](https://eslint.org/docs/latest/use/integrations#editors) for more info about configuring your editor

#### Webstorm

For Webstorm, the Prettier configuration should look like the following:

![webstorm-prettier-config.png](documentation/images/webstorm-prettier-config.png)

And the ESLint configuration should like the following:

![webstorm-eslint-config.png](documentation/images/webstorm-eslint-config.png)

#### Visual Studio Code

For VSC a list with recommended extensions is provided with this project, so please make sure to install those.
The project also contains workspace settings so that those extensions will run on every save to fix formatting and linting
errors, should the pop-up.

Also make sure to check that your workspace settings are correct for auto formatting vue files with ESlint and Prettier
https://pipo.blog/articles/20220103-eslint-prettier-vue3#vs-code-formatonsave

### Docker

For the individual projects, a docker image is available to run the applications via Docker so no other tools should be
required to be downloaded in order to run the applications.

Find the scripts in the `package.json` to create a Docker image locally of the server. For the configuration of your
local Docker stack, create a folder where you'll keep your configuration files for the applications and add another
file to it with the name `compose.yaml`, with the following contents:

```yaml
# ./compose.yaml
client:
  image: wasted-vue-client
  container_name: wasted-client
  ports:
    - '5173:80/tcp'
  depends_on:
    - server
server:
  image: wasted-server
  container_name: wasted-server
  env_file:
    - ./.env
  ports:
    - '8080:8080/tcp'
  volumes:
    - ./config.json:/app/config.json
    - ./database.json:/app/database.json
  depends_on:
    db:
      condition: service_healthy
# optional database service
db:
  image: mysql
  container_name: wasted-mysql-db
  ports:
    - '3306:3306/tcp'
  healthcheck:
    test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost']
    start_period: 20s
    interval: 5s
    timeout: 20s
    retries: 3
```

This configuration assumes a couple of things:

- The `config.json`, `.env`, and the `database.json` files are in the same folder as the `compose.yaml` and the `config.json`
  should have a `server.databaseConfigPath` attribute set to `./database.json`. This later must be done because of the way
  how the node process runs inside the Docker container.
  These configuration files will have the following contents, based on this compose configuration:

```json5
// ./database.json
{
  production: {
    dialect: 'mysql',
    host: 'db',
    port: 3306,
    username: 'username',
    password: 'password'
  }
}
```

```json5
// ./config.json
{
  production: true,
  jwt: {
    // This needs to be identical to the `VITE_JWT_SECRET` environment variable.
    secret: 'secret'
  },
  server: {
    // This needs to be identical to the Docker service that is declared for the server.
    host: 'server',

    // This needs to be identical to the internal port on which the server runs inside the Docker container.
    port: 8080,

    databaseConfig: './database.json',

    // This needs to be identical to the external address on which the docker container is externally available.
    allowedOrigins: ['http://localhost:4005']
  }
}
```

```
# ./.env

# Server environment variables
CONFIG_PATH=./config.json
ENV_PATH=./.env
```

- You have port `8080` available on you local machine.
