const JwtService = require('../services/jwt.service')

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies['auth-token'] || null
  try {
    req.user = JwtService.instance().verifyToken(token)
    next()
  } catch (err) {
    res.clearCookie('auth-token')
    return res.sendStatus(403)
  }
}
