export const newEarnedBadgeSchema = {
  userId: {
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
  badgeId: {
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
  userChallengeId: {
    exists: {
      bail: true,
      options: { values: 'falsy' },
      errorMessage: 'Een gebruikerschallenge-id  is verplicht.'
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
