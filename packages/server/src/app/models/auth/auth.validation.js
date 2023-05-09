const { validRequest } = require('../../validatior/index')
const { username, password } = require('./auth.rule')

const authValidation = validRequest([username, password])

module.exports = {
  authValidation
}
