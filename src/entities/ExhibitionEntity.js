const Entity = require('./Entity');

class ExhibitonEntity extends Entity {

  constructor(id, { name, location, year, type }) {
    super(id);
    this.name = name;
    this.location = location;
    this.year = year;
    this.type = type;
  }
}

module.exports = ExhibitonEntity;
