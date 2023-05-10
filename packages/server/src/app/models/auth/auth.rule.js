const { check } = require('express-validator')

const username = check('username').not().isEmpty().withMessage('Gebruikersnaam is verplicht.')
const password = check('password').not().isEmpty().withMessage('Wachtwoord is verplicht.')

module.exports = {
  username,
  password
}
