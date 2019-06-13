const JWT = require('jsonwebtoken');

async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/users/@me',
    preHandler: (request, reply, done) => {
      if(options.API.tokenVerificator.verifyAccessToken(request)) {
        done();
      } else {
        reply.type('application/json').status(401).send({ message: 'invalid_token' });
      }
    },
    handler: (request, reply) => {
      const id = JWT.verify(request.req.headers['authorization'].split(' ')[1], process.env.JWT_SECRET)['sub'];
      reply.type('application/json').status(200).send(options.API.userCache.get(id));
    }
  });
}

module.exports = routes;
