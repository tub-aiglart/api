class Cache extends Map {

  constructor(API) {
    super();
    this.API = API;
    this.collection = null;
  }

  async add(entity) {
    this.set(entity.id, entity);
    if (await this.collection.findOne({ id: entity.id })) {
      await this.collection.updateOne({ id:  entity.id }, { $set: entity }, (error) => {
        if (error) throw error;
      });
    } else {
      await this.collection.insertOne(entity, (error) => {
        if (error) throw error;
      });
    }
  }

  async remove(entity) {
    this.delete(entity.id);
    await this.collection.deleteOne({ id: entity.id }, (error) => {
      if (error) throw error;
    });
  }

  async initialize(collection) {
    this.collection = collection;
    this.collection.find({}).toArray((error, result) => {
      if (error) throw error;
      result.forEach(entry => this.set(entry.id, entry));
    });
  }
}

module.exports = Cache;
