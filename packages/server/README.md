# WA-2022-group-2: Server

This is the server application for Wasted that runs on [Express](https://expressjs.com/) and [Sequelize](https://sequelize.org/docs/v6/),
and this server currently only supports MySQL databases.

## Developing

Please read the [config section](../../README.md#developing#config) first in order to configure the server correctly.

### MySQL database

Before you can develop on this project, it is **HIGHLY** recommended to set up a MySQL database which you have access to.
This may include:

- Setting up a MySQL database server
- Creating a database/schema
- Creating a database user

Once you've done that, you can copy the database config template, which you can find [here](src/app/config/database-template.json).
Rename the copy to `database.json` and provide the following contents to it:

```json5
{
  '<environment>': {
    // For now, we only support MySQL databases
    dialect: 'mysql',

    // The hostname of where your MySQL database server runs
    host: 'localhost',

    // The port on which your MySQL database server is accessible
    port: 3306,

    // The name of your MySQL database/schema
    database: 'my_db',

    // The database user which has access rights to the database/schema
    username: 'db_user',

    // The password to authenticate and authorize the database user
    password: 'password'
  }
}
```

Update the content on the configuration file to suit your MySQL database server environment that you've set up/ have
available. The `<environment>` field you can change to `development`.

### Sequelize

Assuming you've followed the instructions in the [README in the root](../../README.md#developing) of the repository on
developing in this project, you can use the Sequelize cli from the root of the repository for managing migrations and
seeder scripts.

For more info about Sequelize-cli, please refer to their documentation: https://github.com/sequelize/cli

For ease of use, a command is added to more easily run the migrations, which you can do by running this command in a terminal
which is opened in the root of the repository:

```shell
npm run server:run-migrations
```

After running the migrations, you should be able to start the server without problems by running the following command
in the root of the repository:

```shell
npm run server:start
```

## Building

Builds are made by [esbuild](https://esbuild.github.io/)
You can make a build from the server project by running the following command in a terminal in the root of the repository:

```shell
npm run server:build
```

You can also make a build continuously, meaning it'll rebuild after file changes by running the following command:

```shell
npm run server:build:dev
```

## Testing

This project is configured to run unit tests with [Jest](https://jestjs.io/docs/getting-started).  
To do a single run of tests, run the following command in a terminal in the root of the repository:

```shell
npm run server:test
```

To run tests while your developing a feature and need to run tests automatically after having made a change, run the
following command:

```shell
npm run server:test:dev
```

Test coverage is collected from files excluding `*.controller.js` and `*.router.js` files, these will be covered by
e2e tests.
