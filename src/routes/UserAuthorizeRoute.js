async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/authorize',
    handler: (request, reply) => {
      const decodedCredentials = Buffer.from(request.req.headers['authorization'].split(' ')[1], 'base64').toString('ascii').split(':');

      if (!decodedCredentials || decodedCredentials.length != 2) {
        reply.type('application/json').status(401).send({ error: 'unusable_credentials', message: 'Unusable credentials passed!' });
      } else {
        app.database.db('tub').collection('users').findOne({ username: decodedCredentials[0] }, (error, result) => {
          if (error) throw error;
  
          if (!result) {
            reply.type('application/json').status(404).send({ error: 'invalid_username', message: 'Invalid username passed!' });
          } else if (result.password !== decodedCredentials[1]) {
            reply.type('application/json').status(401).send({ error: 'invalid_password', message: 'Invalid password passed!' });
          } else {
            reply.type('application/json').status(200).send({ access_token: options.API.tokenGenerator.generateAccessToken(result.id), refresh_token: options.API.tokenGenerator.generateRefreshToken(result.id) });
          }  
        });
      }
    }
  });
}

module.exports = routes;
