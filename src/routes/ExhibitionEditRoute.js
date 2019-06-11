const ExhibitionEntitiy = require('../entities/ExhibitionEntitiy');

async function routes (app, options) {
  app.route({
    method: 'PATCH',
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
      options.API.exhibitionCache.add(new ExhibitionEntitiy(exhibition.id, request.body));
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
