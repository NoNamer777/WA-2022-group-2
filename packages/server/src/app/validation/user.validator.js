const loginSchema = {
  username: {
    notEmpty: { bail: true, errorMessage: 'Een gebruikersnaam is verplicht.' },
    isLength: {
      options: { min: 3 },
      errorMessage: 'Een gebruikersnaam moet minimaal 3 tekens bevatten.'
    },
    escape: true
  },
  password: {
    notEmpty: { bail: true, errorMessage: 'Een wachtwoord is verplicht.' },
    isLength: {
      options: { min: 3 },
      errorMessage: 'Het wachtwoord is te kort. Geef minimaal 3 tekens op.'
    },
    escape: true
  }
}

const newUserSchema = {
  username: {
    notEmpty: { bail: true, errorMessage: 'Een gebruikersnaam is verplicht.' },
    isLength: {
      options: { min: 3, max: 80 },
      errorMessage: 'Een gebruikersnaam moet tussen de 3 en 80 tekens bevatten.'
    },
    escape: true
  },
  password: {
    notEmpty: { bail: true, errorMessage: 'Een wachtwoord is verplicht.' },
    isStrongPassword: {
      bail: true,
      options: { minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
      errorMessage:
        'We raden aan om een combinatie te gebruiken van minimaal 1 hoofdletters, 1 kleine letters, 1 symbool, 1 cijfer en een minimaal lengte van 8 tekens.'
    },
    isLength: {
      options: { max: 40 },
      errorMessage: 'Het wachtwoord is te lang. Gebruik maximaal 40 tekens.'
    },
    escape: true
  },
  email: {
    notEmpty: { bail: true, errorMessage: 'Een emailaddres is verplicht.' },
    isLength: {
      bail: true,
      options: { min: 5, max: 80 },
      errorMessage: 'Een emailaddres moet tuseen de 5 en 80 tekenes bevatten.'
    },
    isEmail: { errorMessage: 'Het formaat van de opgegeven emailaddres is onjuist.' },
    escape: true
  }
}

const userSchema = {
  ...newUserSchema,
  id: {
    exists: { bail: true, options: { values: 'falsy' }, errorMessage: 'Een ID is verplicht' },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Een ID moet een heel cijfer zijn wat niet kleiner dan 1 mag zijn.'
    },
    escape: true
  }
}

module.exports = {
  newUserSchema,
  loginSchema,
  userSchema
}
