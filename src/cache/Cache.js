class Cache extends Map {

  constructor(API) {
    super();
    this.API = API;
    this.collection = null;
  }

  async add(entity) {
    this.set(entity.id, entity);
    if (await this.collection.findOne({ id: entity.id })) {
      await this.collection.updateOne({ id:  entity.id }, { $set: entity });
    } else {
      await this.collection.insertOne(entity);
    }
  }

  async remove(entity) {
    this.delete(entity.id);
    await this.collection.deleteOne({ id: entity.id });
  }

  async initialize(collection) {
    this.collection = collection;
  }
}

module.exports = Cache;
