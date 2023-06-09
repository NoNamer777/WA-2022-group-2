import { param } from 'express-validator';

export const entityIdValidator = (paramName, entity) =>
  param(paramName)
    .isInt({ min: 1 })
    .withMessage(
      `Een ID voor een ${entity} mag alleen maar bestaan uit cijfer, die minimaal 1 of hoger moet zijn.`
    );
