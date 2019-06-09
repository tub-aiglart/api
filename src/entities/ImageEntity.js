const Entity = require('./Entity');

class ImageEntity extends Entity {

  constructor(id, { title, description, size, displayed }, { extension }) {
    super(id);
    this.title = title;
    this.description = description;
    this.size = size;
    this.displayed = displayed;
    this.extension = extension;
  }
}

module.exports = ImageEntity;
