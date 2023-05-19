const fs = require('fs');
const { Sequelize } = require('sequelize');
const util = require('util');
const ConfigService = require('./config.service');

class DatabaseService {
  /** @return {DatabaseService} */
  static instance() {
    if (DatabaseService.#instance) return DatabaseService.#instance;

    DatabaseService.#instance = new DatabaseService();
    return this.#instance;
  }

  /** @type {DatabaseService} */
  static #instance;

  /** @type {Sequelize} */
  sequelizeInstance;

  /** @return {Promise<void>} */
  async initialize() {
    const config = await this.#readConfig();

    this.sequelizeInstance = new Sequelize(config.database, config.username, config.password, {
      dialect: config.dialect,
      host: config.host,
      port: config.port,
      logging: false
    });

    await this.sequelizeInstance.authenticate();

    console.info(
      `A database connection with a ${config.dialect} database on http://${config.host}:${config.port}/${config.database}/ has been set up`
    );
  }

  /** @return {Promise<any>} */
  async #readConfig() {
    /** @type {(path: string) => Promise<string>} */
    const readFile$ = util.promisify(fs.readFile);
    const databaseConfigFile = await readFile$(
      ConfigService.instance().config.server.databaseConfigPath
    );

    return JSON.parse(databaseConfigFile)[
      ConfigService.instance().config.production ? 'production' : 'development'
    ];
  }
}

module.exports = DatabaseService;
