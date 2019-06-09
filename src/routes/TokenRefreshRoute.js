const JWT = require('jsonwebtoken');

async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/refresh',
    handler: async (request, reply) => {
      if (options.API.tokenVerificator.verifyRefreshToken(request)) {
        const id = JWT.decode(request.req.headers['authorization'].split(' ')[1])['sub'];
        reply.type('application/json').status(200).send({ access_token: options.API.tokenGenerator.generateAccessToken(id), refresh_token: options.API.tokenGenerator.generateRefreshToken(id) });  
      } else {        
        reply.type('application/json').status(401).send({ message: 'token_invalid' });
      }
    }
  });
}

module.exports = routes;
