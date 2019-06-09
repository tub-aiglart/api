const fs = require('fs');
const Fastify = require('fastify');
const TokenGenerator = require('./utils/TokenGenerator');
const TokenVerificator = require('./utils/TokenVerificator');
const SnowflakeGenerator = require('./utils/SnowflakeGenerator');
const Cache = require('./cache/Cache');

class API {

  constructor() {
    this.app = new Fastify({
      logger: {
        prettyPrint: {
          translateTime: 'dd.mm.yy HH:MM:ss',
          errorLikeObjectKeys: ['err', 'error'],
          ignore: 'pid,hostname'
        },
        level: process.env.LOG_LEVEL
      }
    });
    this.tokenGenerator = new TokenGenerator(this);
    this.tokenVerificator = new TokenVerificator(this);
    this.snowflakeGenerator = new SnowflakeGenerator(this);
    this.imageCache = new Cache(this);
    this.userCache = new Cache(this);
    this.exhibitionCache = new Cache(this);
  }

  async initialize() {
    this.app.register(require('./io/Database'));
    this.app.register(require('fastify-cors'));
    this.app.register(require('fastify-file-upload'));
    
    await fs.readdir('./src/routes/', async (err, routes) => {
      if (err) {
        this.app.log.error(err);
      }
  
      routes.forEach(route => {
        this.app.register(require(`./routes/${route}`), { API: this });
      });
    });

    await this.launch();

    this.imageCache.initialize(this.app.database.db('tub').collection('images'));
    this.userCache.initialize(this.app.database.db('tub').collection('users'));
    this.exhibitionCache.initialize(this.app.database.db('tub').collection('exhibitions'));
  }

  async launch() {
    await this.app.listen(process.env.APP_PORT).catch(err => {
      this.app.log.error(err);
      process.exit(1);
    });
  }
}

module.exports = API;
