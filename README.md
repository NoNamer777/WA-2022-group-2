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
