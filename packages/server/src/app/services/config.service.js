import { readFile } from 'fs/promises';

export class ConfigService {
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
    const configFile = await readFile(process.env.VITE_CONFIG_PATH || './environment/config.json', {
      encoding: 'utf-8'
    });

    this.config = JSON.parse(configFile);
  }
}
