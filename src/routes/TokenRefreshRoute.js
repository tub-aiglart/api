const JWT = require('jsonwebtoken');

async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/refresh',
    handler: async (request, reply) => {
      if (options.API.tokenVerificator.verifyRefreshToken(request)) {
        const token = request.req.headers['authorization'].split(' ')[1];
        const id = JWT.decode(token)['sub'];
        console.log(id); /* eslint-disable-line */
        reply.type('application/json').status(200);  
        return {
          message: 'token_valid',
          access_token: options.API.tokenGenerator.generateAccessToken(id),
          refresh_token: options.API.tokenGenerator.generateRefreshToken(id)
        };
      } else {        
        reply.type('application/json').status(401);
        return {
          message: 'token_invalid'
        };
      }
    }
  });
}

module.exports = routes;
