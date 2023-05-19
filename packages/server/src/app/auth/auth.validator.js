export const loginSchema = {
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
};
