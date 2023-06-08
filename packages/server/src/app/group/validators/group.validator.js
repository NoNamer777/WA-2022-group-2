export const newGroupSchema = {
  name: {
    notEmpty: { bail: true, errorMessage: 'Een groepsnaam is verplicht.' },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Een groepsnaam moet tussen de 3 en 255 tekens bevatten.'
    },
    escape: true
  },
  user_id: {
    exists: {
      bail: true,
      options: { values: 'falsy' },
      errorMessage: 'Een gebruikers-id is verplicht.'
    },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  }
};

export const groupSchema = {
  ...newGroupSchema,
  id: {
    exists: { bail: true, options: { values: 'falsy' }, errorMessage: 'Een ID is verplicht' },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  }
};

export const joinGroupSchema = {
  code: {
    notEmpty: { bail: true, errorMessage: 'Een groepscode is verplicht.' },
    escape: true
  },
  user_id: {
    exists: {
      bail: true,
      options: { values: 'falsy' },
      errorMessage: 'Een gebruikers-id is verplicht.'
    },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  }
};
