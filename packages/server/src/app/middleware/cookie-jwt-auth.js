const jwt = require('jsonwebtoken')

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies && req.cookies.authToken ? req.cookies.authToken : ''
  try {
    req.user = jwt.verify(token, 'MY_SECRET')
    next()
  } catch (err) {
    res.clearCookie('token')
    return res.sendStatus(403)
  }
}
