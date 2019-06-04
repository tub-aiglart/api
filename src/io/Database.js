const fastifyPlugin = require('fastify-plugin');
const MongoClient = require('mongodb').MongoClient;

async function Database (fastify) {
  const database = await MongoClient.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
    authSource: process.env.DB_AUTHENTICATIONDATABASE,
    useNewUrlParser: true
  });
  
  fastify.decorate('database', database);
}

module.exports = fastifyPlugin(Database);
