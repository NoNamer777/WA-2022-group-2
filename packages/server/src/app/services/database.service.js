import { readFile } from 'fs/promises';
import { Sequelize } from 'sequelize';
import { initializeUserEntity } from '../models/user/user.entity.js';
import { ConfigService } from './config.service.js';

export class DatabaseService {
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

    initializeUserEntity();

    console.info(
      `A database connection with a ${config.dialect} database on http://${config.host}:${config.port}/${config.database}/ has been set up`
    );
  }

  /** @return {Promise<any>} */
  async #readConfig() {
    const databaseConfigFile = await readFile(
      ConfigService.instance().config.server.databaseConfigPath,
      { encoding: 'utf-8' }
    );

    return JSON.parse(databaseConfigFile)[
      ConfigService.instance().config.production ? 'production' : 'development'
    ];
  }
}
