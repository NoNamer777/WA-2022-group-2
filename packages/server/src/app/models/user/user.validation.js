const { validRequest } = require('../../validatior/index')
const { email, username, password, passwordConfirm } = require('./user.rule')

const postValidation = validRequest([email, username, password, passwordConfirm])

module.exports = { postValidation }
