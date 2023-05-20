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

### Config

This server and client use a config file to set up some aspects of the applications.
You must copy the template found [here](./environment/config-template.json) and rename the copied file to `config.json`.
Below here follows an example of what the config may look like:

```json5
{
  // Whether the server and client run in production mode, thus changing some values or processes
  production: false,
  jwt: {
    // The JWT secret, used to encode and decode JWT tokens
    token: 'My super secret token'
  },
  server: {
    // The host address of the server
    host: 'localhost',

    // The port on the host on which the server runs on
    port: 8080,

    // The location of the database config
    databaseConfigPath: '../config/database.json',

    // Origins that are allowed to connect to the server via the CORS settings
    allowedOrigins: ['http://localhost:5173', 'http://127.0.0.1:5173']
  },
  client: {
    // The host address of the web client
    host: 'localhost',

    // The port on the host address on which the web client runs on
    port: 4200
  }
}
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

### Environment Variables

The server and client both can handle a couple of the following environment variables:

| Variable         | Project | Default value             | Values | Description                                                                            |
| ---------------- | ------- | ------------------------- | ------ | -------------------------------------------------------------------------------------- |
| VITE_CONFIG_PATH | Both    | ./environment/config.json |        | The path to the configuration for both the web client and server applications.         |
| VITE_ENV_PATH    | Both    | ./environment/.env        |        | The path to the environment variables for both the web client and server applications. |

You also need to set up your own environment variable. To do this you have to copy the template,
which you can find [here](../../environment/.env.example). Rename the copy to `.env` and fill in the variables

### Docker

For the individual projects, a docker image is available to run the applications via Docker so no other tools should be
required to be downloaded in order to run the applications.

Find the scripts in the `package.json` to create a Docker image locally of the server. For the configuration of your
local Docker stack, create an folder where you'll keep your configuration files for the applications and add another
file to it with the name `compose.yaml`, with the following contents:

```yaml
server:
  image: wasted-server
  container_name: wasted-server
  env:
    - SERVER_PORT=8080
  env_file:
    - ./.env
  ports:
    - '8080:8080/tcp'
  volumes:
    - ./config.json:/app/config.json
    - ./database.json:/app/database.json
```

This configuration assumes a couple of things:

- The provided environment variable `SERVER_PORT` and the exposed container port need to be the same as the port that
  the server is configured to run on in the `config.json` file.
- The `config.json`, `.env`, and the `database.json` files are in the same folder as the `compose.yaml` and the `config.json`
  should have a `server.databaseConfigPath` attribute set to `./database.json`. This later must be done because of the way
  how the node process runs inside the Docker container.
- You have port `8080` available on you local machine.
- The database container or installation is not included, so you'll need to provide that yourself.

NOTE: keep in mind that Docker handles the `host` attribute for databases differently then "just" making it available
on your local machine. If you've locally installed a database, then you can use that like normal. If you have provided
your database instance via Docker however, you'll need to provide the name of the Docker service that you've declared
to hold your database container/instance for the `host` of the database, instead of `localhost`. Have a MySQL database
instance provided like below:

```yaml
db:
  image: mysql
  container_name: mysql_database
```

The value you'll need to provide to the `host` attribute of the database configuration for the server would be: `db`.

NOTE: Not every database is instantly ready at the get go, the moment the database container is created, so it is
heavenly advised to delay the creation of the server container (if you have a Docker application stack which includes
this server and a database instance) after your database container is fully ready to receive connections.
You can do this for example with health checks like so:

```yaml
server:
  image: wasted-server
  ...
  depends_on:
    db:
      condition: service_healthy
db:
  image: mysql
  ...
  healthcheck:
    test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
    timeout: 20s
    retries: 10
```

This will make sure that the creation of the server application container is delayed until the mysql database is ready
to receive connections resulting in avoidable manual restarts of the server on creation of the application stack.
