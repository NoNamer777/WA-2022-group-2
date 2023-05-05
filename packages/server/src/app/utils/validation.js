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

module.exports = { isNumber }
