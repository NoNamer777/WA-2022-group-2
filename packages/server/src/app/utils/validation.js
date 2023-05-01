/**
 * Checks if the provided string object only contains numbers
 * @param obj {string}
 * @return {boolean}
 */
function isNumber(obj) {
  return obj && obj.match(/^[0-9]$/g) !== null
}

module.exports = {
  isNumber
}
