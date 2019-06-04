async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/validate',
    handler: async (request, reply) => {
      if (options.API.tokenVerificator.verifyAccessToken(request)) {
        reply.type('application/json').status(200);
        return {
          message: 'token_valid'
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
