const { validRequest } = require('../../validatior/index')
const {
  validEmail,
  validUsername,
  username,
  validPassword,
  password,
  validPasswordConfirm
} = require('./user.rule')

const postValidation = validRequest([
  validEmail,
  validUsername,
  validPassword,
  validPasswordConfirm
])
const authValidation = validRequest([username, password])

module.exports = {
  postValidation,
  authValidation
}
