const JWT = require('jsonwebtoken');

const Secret = process.env.JWT_SECRET;

class TokenVerificator {

  constructor(API) {
    this.API = API;
  }

  verifyAccessToken(request) {
    try {
      const payload = JWT.verify(request.req.headers['authorization'].split(' ')[1], Secret);
      if (payload['type'] !== 'access') {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  verifyRefreshToken(request) {
    try {
      const payload = JWT.verify(request.req.headers['authorization'].split(' ')[1], Secret);
      if (payload['type'] !== 'refresh') {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = TokenVerificator;
