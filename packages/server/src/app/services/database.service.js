const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')

class DatabaseService {
  /** @return {Promise<DatabaseService>} */
  static async instance() {
    if (DatabaseService.#instance) return DatabaseService.#instance

    DatabaseService.#instance = new DatabaseService()
    await DatabaseService.#instance.#initialize()

    return this.#instance
  }

  /** @type {DatabaseService} */
  static #instance

  /** @type {Sequelize} */
  sequelizeInstance

  /** @return {Promise<void>} */
  async #initialize() {
    let config = fs.readFileSync(
      process.env.DATABASE_CONFIG_PATH || path.join(__dirname, '../config/database.json'),
      'utf-8'
    )
    config = JSON.parse(config)

    config = process.env.SERVER_PRODUCTION || false ? config.production : config.development

    this.sequelizeInstance = new Sequelize(config.database, config.username, config.password, {
      dialect: config.dialect,
      host: config.host,
      port: config.port
    })

    await this.sequelizeInstance.authenticate()
    console.info(
      `A database connection with a ${config.type} database on http://${config.host}:${config.port}/${config.database}/ has been set up`
    )
  }
}

module.exports = DatabaseService
