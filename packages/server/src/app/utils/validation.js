const { validationResult } = require('express-validator')

/**
 * Checks if the provided string object only contains numbers
 * @param obj {string | number}
 * @return {boolean}
 */
function isNumber(obj) {
  if (obj === undefined || obj === null) return false
  if (typeof obj === 'number') return true

  return typeof obj === 'string' && obj.match(/^[0-9]$/g) !== null
}

/**
 * Checks if the provided string object only contains numbers
 * @return {boolean}
 * @param validations
 */
function validRequest(validations) {
  return async (req, res, next) => {
    for (let validation of validations) {
      await validation.run(req)
    }

    const errors = validationResult(req).formatWith((error) => {
      return { message: error.msg }
    })

    if (errors.isEmpty()) {
      return next()
    }

    return res.status(412).json({ errors: errors.array() })
  }
}

module.exports = {
  isNumber,
  validRequest
}
