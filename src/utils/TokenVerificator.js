const JWT = require('jsonwebtoken');

const Secret = process.env.JWT_SECRET;

class TokenVerificator {

  constructor(API) {
    this.API = API;
  }

  verifyAccessToken(request) {
    const token = request.req.headers['authorization'].split(' ')[1];
    try {
      const payload = JWT.verify(token, Secret);
      if (payload['type'] !== 'access') {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  verifyRefreshToken(request) {
    const token = request.req.headers['authorization'].split(' ')[1];
    try {
      const payload = JWT.verify(token, Secret);
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
