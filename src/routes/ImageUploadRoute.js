const fs = require('fs');

const ImageEnitiy = require('../entities/ImageEntity');

async function routes (app, options) {
  app.addContentTypeParser('*', function (request, done) {
    done();
  });

  app.route({
    method: 'POST',
    url: '/image',
    preHandler: (request, reply, done) => {
      if(options.API.tokenVerificator.verifyAccessToken(request)) {
        done();
      } else {
        reply.type('application/json').status(401).send({ message: 'invalid_token' });
      }
    },
    handler: (request, reply) => {
      const file = request.raw.files.file;
      const data = request.raw.body;

      const id = options.API.snowflakeGenerator.generateSnowflake();
      const extension = '.' + file.name.split('.')[1];

      fs.writeFile(process.env.CDN_PATH + id + extension, file.data, (error) => {
        error !== null ? app.log.error(error) : '';
      });

      options.API.imageCache.add(new ImageEnitiy(id, data, { extension: extension }));
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
