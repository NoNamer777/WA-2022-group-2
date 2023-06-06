export const newBadgeSchema = {
  name: {
    notEmpty: { bail: true, errorMessage: 'Een naam is verplicht.' },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Een naam moet tussen de 3 en 80 tekens bevatten.'
    },
    escape: true
  },
  image_path: {
    notEmpty: { bail: true, errorMessage: 'Een afbeelding locatie is verplicht.' },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Een afbeelding locatie moet tussen de 3 en 255 tekens bevatten.'
    },
    escape: true
  }
};

export const badgeSchema = {
  ...newBadgeSchema,
  id: {
    exists: { bail: true, options: { values: 'falsy' }, errorMessage: 'Een ID is verplicht' },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  }
};
