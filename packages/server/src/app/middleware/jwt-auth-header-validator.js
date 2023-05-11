const JwtService = require('../services/jwt.service')
const UnauthorizedException = require('../models/errors/unauthorized-exception')

module.exports = function jwtAuthHeaderValidator(req, res, next) {
  const token = req.headers.authorization || null

  if (!token) {
    return res.status(403).send(new UnauthorizedException('Unauthorized'))
  }

  try {
    req.user = JwtService.instance().verifyToken(token.replace('Bearer ', ''))
    next()
  } catch (err) {
    return res.status(403).send(new UnauthorizedException('Unauthorized'))
  }
}
