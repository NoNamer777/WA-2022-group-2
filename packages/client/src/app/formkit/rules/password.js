/**
 *
 * This function uses a regular expression to check that the password meets the following criteria:
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one digit
 * - At least one special character i.e. !@#$%^&*_\-+=;:<>.?())
 */
export default (node) => {
  let password = node.value
  const strongRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-+=;:<>.?()])[a-zA-Z0-9!@#$%^&*_\-+=;:<>.?()]+/
  return strongRegex.test(password)
}
