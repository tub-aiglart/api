const fs = require('fs');

async function routes (app, options) {
  app.route({
    method: 'DELETE',
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
      fs.unlink(process.env.CDN_PATH + image.id + image.extension, (error) => {
        if (error) throw error;
      });
      options.API.imageCache.remove(image);
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
