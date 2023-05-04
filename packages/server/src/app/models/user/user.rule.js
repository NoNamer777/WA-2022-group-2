const { check } = require('express-validator')

const validEmail = check('email')
  .not()
  .isEmpty()
  .withMessage('Email is verplicht.')
  .bail()
  .isLength({
    min: 5,
    max: 80
  })
  .withMessage('Email moet tussen de 80 en 5 tekens bevatten.')
  .bail()
  .isEmail()
  .withMessage('Vul een geldig e-mailadres in.')

const username = check('username').not().isEmpty().withMessage('Gebruikersnaam is verplicht.')

const validUsername = check('username')
  .not()
  .isEmpty()
  .withMessage('Gebruikersnaam is verplicht.')
  .bail()
  .isLength({
    min: 3,
    max: 80
  })
  .withMessage('Gebruikersnaam moet tussen de 80 en 3 tekens bevatten.')

const password = check('password').not().isEmpty().withMessage('Wachtwoord is verplicht.')

const validPassword = check('password')
  .not()
  .isEmpty()
  .withMessage('Wachtwoord is verplicht.')
  .bail()
  .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-+=;:<>.?()])[a-zA-Z0-9!@#$%^&*_\-+=;:<>.?()]+/)
  .withMessage(
    'We raden aan een combinatie te maken van hoofdletters, kleine letters, cijfers en speciale tekens.'
  )
  .bail()
  .isLength({
    min: 8,
    max: 40
  })
  .withMessage('Wachtwoord moet tussen de 40 en 8 tekens bevatten.')

const validPasswordConfirm = check('password_confirm')
  .not()
  .isEmpty()
  .withMessage('Herhaal wachtwoord is verplicht.')
  .bail()
  .custom((value, { req }) => value === req.body.password)
  .withMessage('Herhaal wachtwoord komt niet overeen.')

module.exports = {
  validEmail,
  validUsername,
  username,
  validPassword,
  password,
  validPasswordConfirm
}
