const Entity = require('./Entity');

class ExhibitonEntity extends Entity {

  constructor(id, { name, location, year }) {
    super(id);
    this.name = name;
    this.location = location;
    this.year = year;
  }
}

module.exports = ExhibitonEntity;
