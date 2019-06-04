const Flake = require('flakeid');
  
class SnowflakeGenerator extends Flake {

  constructor(API) {
    super();
    this.API = API;
  }

  generateSnowflake() {
    return this.gen();
  }
}

module.exports = SnowflakeGenerator;
