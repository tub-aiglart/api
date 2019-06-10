const ImageEntity = require('../entities/ImageEntity');

async function routes (app, options) {
  app.route({
    method: 'PATCH',
    url: '/image/:id',
    preHandler: (request, reply, done) => {
      if(options.API.tokenVerificator.verifyAccessToken(request)) {
        done();
      } else {
        reply.type('application/json').status(401).send({ message: 'invalid_token' });
      }
    },
    handler: (request, reply) => {
      const image = options.API.imageCache.get(request.params.id);
      options.API.imageCache.add(new ImageEntity(image.id, request.body, { extension: image.extension }));
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
