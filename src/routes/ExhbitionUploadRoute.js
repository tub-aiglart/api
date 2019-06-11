const ExhibitionEntity = require('../entities/ExhibitionEntity');

async function routes (app, options) {
  app.addContentTypeParser('*', function (request, done) {
    done();
  });

  app.route({
    method: 'POST',
    url: '/exhibition',
    preHandler: (request, reply, done) => {
      if(options.API.tokenVerificator.verifyAccessToken(request)) {
        done();
      } else {
        reply.type('application/json').status(401).send({ message: 'invalid_token' });
      }
    },
    handler: (request, reply) => {
      const data = request.raw.body;
      const id = options.API.snowflakeGenerator.generateSnowflake();

      options.API.exhibitionCache.add(new ExhibitionEntity(id, data));
      reply.type('application/json').status(200).send({ message: 'success' });
    }
  });
}

module.exports = routes;
