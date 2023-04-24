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

After that you can find the instructions for the different projects on how to get the projects started

| Project | location                          |
| ------- | --------------------------------- |
| Client  | [Here](packages/client/README.md) |

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

