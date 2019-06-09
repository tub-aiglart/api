const ImageEntity = require('../entities/ImageEntity');

async function routes (app, options) {
  app.route({
    method: 'PATCH',
    url: '/image/:id',
    handler: (request, reply) => {
      const image = options.API.imageCache.get(request.params.id);
      options.API.imageCache.add(new ImageEntity(image.id, request.body, { extension: image.extension }));
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
