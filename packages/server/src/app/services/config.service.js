const util = require('util');
const fs = require('fs');
const path = require('path');

class ConfigService {
  /**  @return {ConfigService} */
  static instance() {
    if (ConfigService.#instance) return ConfigService.#instance;

    ConfigService.#instance = new ConfigService();
    return ConfigService.#instance;
  }

  /** @type {ConfigService} */
  static #instance;

  /** @type {{ production: boolean, jwt: { token: string }, server: { host: string, port: number, databaseConfigPath: string, allowedOrigins: string|string[] } }} */
  config;

  /** @return {Promise<void>} */
  async initialize() {
    /** @type {(path: string) => Promise<string>} */
    const readFile$ = util.promisify(fs.readFile);

    const configFile = await readFile$(
      process.env.VITE_CONFIG_PATH || path.join('../../../../environment/config.json')
    );

    this.config = JSON.parse(configFile);
  }
}

module.exports = ConfigService;
