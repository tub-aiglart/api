async function routes (app) {
  app.route({
    method: 'GET',
    url: '/exhibition/:id',
    handler: (request, reply) => {
      app.database.db('tub').collection('exhibitions').findOne({ id: request.params.id }, (error, result) => {
        if (error) throw error;
        reply.type('applications/json').status(200).send(JSON.stringify(result));
      });
    }
  });
}

module.exports = routes;
