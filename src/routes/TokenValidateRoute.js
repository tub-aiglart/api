async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/validate',
    handler: (request, reply) => {
      if (options.API.tokenVerificator.verifyAccessToken(request)) {
        reply.type('application/json').status(200).send({ message: 'token_valid' });
      } else {        
        reply.type('application/json').status(401).send({ message: 'token_invalid' });
      }
    }
  });
}

module.exports = routes;
