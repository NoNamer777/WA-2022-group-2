import { readFile } from 'fs/promises';
import { Sequelize } from 'sequelize';
import { EntityService } from './entity.service.js';

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

    try {
      this.sequelizeInstance = new Sequelize({
        ...config,
        logging: false
      });

      await this.sequelizeInstance.authenticate();

      EntityService.instance().initializeEntities();
      EntityService.instance().initializeEntityRelations();

      console.info(this.#getSuccessMessage(config));
    } catch (error) {
      console.error('Something went wrong while establishing a connection with the database');
      throw error;
    }
  }

  /** @return {Promise<{ dialect: 'sqlite', storage: string } | { dialect: 'mysql', host: string, port: number, database: string, username: string, password: string }>} */
  async #readConfig() {
    try {
      const databaseConfigFile = await readFile(
        process.env.DATABASE_CONFIG_PATH || './environment/database.json',
        {
          encoding: 'utf-8'
        }
      );

      return JSON.parse(databaseConfigFile)[process.env.NODE_ENV || 'development'];
    } catch (error) {
      console.error('Something went wrong while trying to read the database configuration');

      return {
        dialect: 'sqlite',
        storage: './data.db'
      };
    }
  }

  #getSuccessMessage(config) {
    if (config.dialect === 'mysql') {
      return `A database connection with a ${config.dialect} database on http://${config.host}:${config.port}/${config.database}/ has been set up`;
    } else if (config.dialect === 'sqlite') {
      return `A database connection with a ${config.dialect} database has been set. Storing the data in: '${config.storage}'`;
    }
    return '';
  }
}
