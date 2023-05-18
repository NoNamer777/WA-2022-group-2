const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')

class DatabaseService {
  /** @return {DatabaseService} */
  static instance() {
    if (DatabaseService.#instance) return DatabaseService.#instance

    DatabaseService.#instance = new DatabaseService()
    return this.#instance
  }

  /** @type {DatabaseService} */
  static #instance

  /** @type {Sequelize} */
  sequelizeInstance

  constructor() {
    let config = fs.readFileSync(
      process.env.SERVER_DATABASE_CONFIG_PATH || path.join(__dirname, '../config/database.json'),
      'utf-8'
    )
    config = JSON.parse(config)

    config = process.env.NODE_ENV === 'production' ? config.production : config.development

    this.sequelizeInstance = new Sequelize(config.database, config.username, config.password, {
      dialect: config.dialect,
      host: config.host,
      port: config.port,
      logging: false
    })

    this.sequelizeInstance
      .authenticate()
      .then(() =>
        console.info(
          `A database connection with a ${config.dialect} database on http://${config.host}:${config.port}/${config.database}/ has been set up`
        )
      )
  }
}

module.exports = DatabaseService
