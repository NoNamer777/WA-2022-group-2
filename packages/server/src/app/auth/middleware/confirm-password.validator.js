import { body } from 'express-validator';

export const confirmPasswordValidator = body('passwordConfirm')
  .notEmpty()
  .withMessage('Je wachtwoord bevestigen is verplicht.')
  .bail()
  .custom((value, { req: request }) => value === request.body.password)
  .withMessage('Het herhaalde wachtwoord komt niet overeen.');
