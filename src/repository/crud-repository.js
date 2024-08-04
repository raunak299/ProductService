class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const instance = await this.model.create(data);
      return instance;
    } catch (err) {
      console.log("something went wrong in crud repository inside create");
      throw err;
    }
  }

  async get(id) {
    try {
      const instance = await this.model.findByPk(id);
      return instance;
    } catch (err) {
      console.log("something went wrong in crud repository inside get");
      throw err;
    }
  }

  async getAll() {
    try {
      const instances = await this.model.findAll();
      return instances;
    } catch (err) {
      console.log(err);
      console.log("something went wrong in crud repository inside getAll");
      throw err;
    }
  }

  async update(id, data) {
    try {
      const instance = await this.model.findByPk(id);
      instance.set(data);
      instance.save();
      return instance;
    } catch (err) {
      console.log("something went wrong in crud repository inside update");
      throw err;
    }
  }

  async destroy(id) {
    try {
      await this.model.destroy({
        where: { id: id },
      });
      return true;
    } catch (err) {
      console.log("something went wrong in crud repository inside destroy");
      throw err;
    }
  }
}

module.exports = CrudRepository;
