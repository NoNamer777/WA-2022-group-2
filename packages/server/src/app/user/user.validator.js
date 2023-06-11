export const passwordValidator = {
  notEmpty: { bail: true, errorMessage: 'Een wachtwoord is verplicht.' },
  isStrongPassword: {
    bail: true,
    options: { minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
    errorMessage:
      'Een wachtwoord moet minimaal een combinatie van 1 hoofdletter, 1 kleine letter, 1 symbool, 1 cijfer, en in totaal minimaal 8 tekens bevatten.'
  },
  isLength: {
    options: { max: 40 },
    errorMessage: 'Het wachtwoord is te lang. Gebruik maximaal 40 tekens.'
  },
  escape: true
};

export const newUserSchema = {
  username: {
    notEmpty: { bail: true, errorMessage: 'Een gebruikersnaam is verplicht.' },
    isLength: {
      options: { min: 3, max: 80 },
      errorMessage: 'Een gebruikersnaam moet tussen de 3 en 80 tekens bevatten.'
    },
    escape: true
  },
  password: passwordValidator,
  email: {
    notEmpty: { bail: true, errorMessage: 'Een email addres is verplicht.' },
    isLength: {
      bail: true,
      options: { min: 5, max: 80 },
      errorMessage: 'Een email addres moet tussen de 5 en 80 tekenes bevatten.'
    },
    isEmail: { errorMessage: 'Het formaat van de opgegeven email addres is onjuist.' },
    escape: true
  },
  profileImagePath: {
    notEmpty: { bail: true, errorMessage: 'Een profielafbeelding is verplicht.' },
    escape: true
  }
};

export const userSchema = {
  ...newUserSchema,
  id: {
    exists: { bail: true, options: { values: 'falsy' }, errorMessage: 'Een ID is verplicht' },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Een ID moet een heel cijfer zijn wat niet kleiner dan 1 mag zijn.'
    },
    escape: true
  }
};
