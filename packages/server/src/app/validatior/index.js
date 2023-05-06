const { validationResult } = require('express-validator')

/**
 * Validates if the current request satisfies the specified rules
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

module.exports = { validRequest }
