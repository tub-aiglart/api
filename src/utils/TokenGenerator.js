const JWT = require('jsonwebtoken');

const Secret = process.env.JWT_SECRET;

class TokenGenerator {

  constructor(API) {
    this.API = API;
  }

  generateAccessToken(id) {
    return JWT.sign({ sub: id, type: 'access'}, Secret, {
      expiresIn: '1h'
    });
  }

  generateRefreshToken(id) {
    return JWT.sign({ sub: id, type: 'refresh'}, Secret, {
      expiresIn: '7d'
    });
  }
}

module.exports = TokenGenerator;
