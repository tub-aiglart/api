async function routes (app) {
  app.route({
    method: 'GET',
    url: '/images',
    handler: (request, reply) => {      
      app.database.db('tub').collection('images').find({}).toArray((error, result) => {
        if (error) throw error;
        reply.type('application/json').status(200).send(result);
      });
    }
  });
}

module.exports = routes;
