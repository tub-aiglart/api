async function routes (app) {
  app.route({
    method: 'GET',
    url: '/image/:id',
    handler: (request, reply) => {
      app.database.db('tub').collection('images').findOne({ id: request.params.id }, (error, result) => {
        if (error) throw error;
        reply.type('applications/json').status(200).send(JSON.stringify(result));
      });
    }
  });
}

module.exports = routes;
