const { check } = require('express-validator')

const email = check('email')
  .exists()
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

const username = check('username')
  .exists()
  .withMessage('Gebruikersnaam is verplicht.')
  .bail()
  .isLength({
    min: 3,
    max: 80
  })
  .withMessage('Gebruikersnaam moet tussen de 80 en 3 tekens bevatten.')

const password = check('password')
  .exists()
  .withMessage('Wachtwoord is verplicht.')
  .bail()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10
  })
  .withMessage(
    'We raden aan een combinatie te maken van hoofdletters, kleine letters, cijfers en speciale tekens.'
  )
  .bail()
  .isLength({
    min: 8,
    max: 40
  })
  .withMessage('Wachtwoord moet tussen de 40 en 8 tekens bevatten.')

const passwordConfirm = check('password_confirm')
  .exists()
  .withMessage('Herhaal wachtwoord is verplicht.')
  .bail()
  .custom((value, { req }) => value === req.body.password)
  .withMessage('Herhaal wachtwoord komt niet overeen.')

module.exports = {
  email,
  username,
  password,
  passwordConfirm
}
