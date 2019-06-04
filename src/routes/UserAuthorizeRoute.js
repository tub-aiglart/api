async function routes (app, options) {
  app.route({
    method: 'GET',
    url: '/authorize',
    handler: async (request, reply) => {
      let decodedCredentials;

      try {
        decodedCredentials = Buffer.from(request.req.headers['authorization'].split(' ')[1], 'base64').toString('ascii').split(':');
      } catch(err) {
        reply.type('application/json').code(401);
        return {
          error: 'unparsable_credentials',
          message: 'Could not parse credentials!'
        };
      }

      if (!decodedCredentials || decodedCredentials.length != 2) {
        reply.type('application/json').status(401);
        return {
          error: 'unusable_credentials',
          message: 'Unusable credentials passed!'
        };
      }

      const user = new Object(await app.database.db('tub').collection('users').findOne({ username: decodedCredentials[0] }));

      if (!user.password) {
        reply.type('application/json').status(404);
        return {
          error: 'invalid_username',
          message: 'Invalid username passed!'
        };
      }

      if (user.password !== decodedCredentials[1]) {
        reply.type('application/json').status(401);
        return {
          error: 'invalid_password',
          message: 'Invalid password passed!'
        };
      }

      reply.type('application/json').status(200);

      return {
        access_token: options.API.tokenGenerator.generateAccessToken(user.id),
        refresh_token: options.API.tokenGenerator.generateRefreshToken(user.id)
      };
    }
  });
}

module.exports = routes;
