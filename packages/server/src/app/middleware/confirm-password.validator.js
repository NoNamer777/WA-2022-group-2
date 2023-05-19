const { body } = require('express-validator');

module.exports = body('passwordConfirm')
  .notEmpty()
  .withMessage('Je wachtwoord bevestigen is verplicht.')
  .bail()
  .custom((value, { req: request }) => value === request.body.password)
  .withMessage('Het herhaalde wachtwoord komt niet overeen.');
