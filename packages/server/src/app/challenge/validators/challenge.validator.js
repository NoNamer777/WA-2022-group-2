export const newChallengeSchema = {
  name: {
    notEmpty: { bail: true, errorMessage: 'Een naam is verplicht.' },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Een naam moet tussen de 3 en 80 tekens bevatten.'
    },
    escape: true
  },
  startDate: {
    notEmpty: { bail: true, errorMessage: 'Een startdatum is verplicht.' },
    isDate: { bail: true, errorMessage: 'Een startdatum moet een geldige datum zijn' },
    escape: true
  },
  endDate: {
    notEmpty: { bail: true, errorMessage: 'Een einddatum is verplicht.' },
    isDate: { bail: true, errorMessage: 'Een einddatum moet een geldige datum zijn' },
    escape: true
  },
  groupId: {
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
      optional: { values: null }
    },
    escape: true
  }
};
