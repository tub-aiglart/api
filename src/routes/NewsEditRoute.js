async function routes (app, options) {
  app.route({
    method: 'PATCH',
    url: '/news',
    preHandler: (request, reply, done) => {
      if(options.API.tokenVerificator.verifyAccessToken(request)) {
        done();
      } else {
        reply.type('application/json').status(401).send({ message: 'invalid_token' });
      }
    },
    handler: (request, reply) => {
      app.database.db('tub').collection('news').updateOne({}, { $set: request.body }, (error) => {
        if (error) throw error;
        reply.type('application/json').status(200).send({ message: 'success' });
      });
    }
  });
}

module.exports = routes;
