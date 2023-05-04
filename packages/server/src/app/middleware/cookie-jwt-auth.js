const jwt = require('jsonwebtoken')

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies['auth-token'] || null
  try {
    req.user = jwt.verify(token, 'MY_SECRET')
    next()
  } catch (err) {
    res.clearCookie('auth-token')
    return res.sendStatus(403)
  }
}
