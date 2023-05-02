const { validRequest } = require('../../utils/validation')
const { email, username, password, passwordConfirm } = require('./user.rule')

const postValidation = validRequest([email, username, password, passwordConfirm])

module.exports = {
  postValidation
}
