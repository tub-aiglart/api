const Entity = require('./Entity');

class UserEntity extends Entity {

  constructor(id, { name, password, email }) {
    super(id);
    this.name = name;
    this.password = password;
    this.email = email;
  }
}

module.exports = UserEntity;
