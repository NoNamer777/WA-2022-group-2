export const newChallengeSchema = {
  name: {
    notEmpty: { bail: true, errorMessage: 'Een naam is verplicht.' },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Een naam moet tussen de 3 en 80 tekens bevatten.'
    },
    escape: true
  },
  start_date: {
    notEmpty: { bail: true, errorMessage: 'Een startdatum is verplicht.' },
    isDate: { bail: true, errorMessage: 'Een startdatum moet een geldige datum zijn' },
    escape: true
  },
  end_date: {
    notEmpty: { bail: true, errorMessage: 'Een einddatum is verplicht.' },
    isDate: { bail: true, errorMessage: 'Een einddatum moet een geldige datum zijn' },
    escape: true
  },
  groups: {
    notEmpty: { bail: true, errorMessage: 'Een groep is verplicht.' },
    escape: true
  }
};

export const challengeSchema = {
  ...newChallengeSchema,
  id: {
    exists: { bail: true, options: { values: 'falsy' }, errorMessage: 'Een ID is verplicht' },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Een ID moet een heel cijfer zijn wat niet kleiner dan 1 mag zijn.'
    },
    escape: true
  }
};
