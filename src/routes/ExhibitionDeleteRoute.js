async function routes (app, options) {
  app.route({
    method: 'DELETE',
    url: '/exhibition/:id',
    preHandler: (request, reply, done) => {
      if(options.API.tokenVerificator.verifyAccessToken(request)) {
        done();
      } else {
        reply.type('application/json').status(401).send({ message: 'invalid_token' });
      }
    },
    handler: (request, reply) => {
      const exhibition = options.API.exhibitionCache.get(request.params.id);
      options.API.exhibitionCache.remove(exhibition);
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
