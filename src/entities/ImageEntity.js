const Entity = require('./Entity');

class ImageEntity extends Entity {

  constructor(id, { title, description, size, displayed }) {
    super(id);
    this.title = title;
    this.description = description;
    this.size = size;
    this.displayed = displayed;
  }
}

module.exports = ImageEntity;
