export const newEarnedBadgeSchema = {
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
  },
  badge_id: {
    exists: {
      bail: true,
      options: { values: 'falsy' },
      errorMessage: 'Een badge-id is verplicht.'
    },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  },
  user_challenge_id: {
    exists: {
      bail: true,
      options: { values: 'falsy' },
      errorMessage: 'Een user_challenge_id  is verplicht.'
    },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  }
};

export const earnedBadgeSchema = {
  ...newEarnedBadgeSchema,
  id: {
    exists: { bail: true, options: { values: 'falsy' }, errorMessage: 'Een ID is verplicht' },
    isInt: {
      options: { min: 1 },
      optional: { values: null }
    },
    escape: true
  }
};
