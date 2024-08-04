class CrudService {
  constructor(repository) {
    this.crudRepository = repository;
  }

  async create(data) {
    try {
      const result = await this.crudRepository.create(data);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      throw err;
    }
  }

  async get(id) {
    try {
      const result = await this.crudRepository.get(id);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      throw err;
    }
  }

  async getAll() {
    try {
      const result = await this.crudRepository.getAll();
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      throw err;
    }
  }

  async update(id, data) {
    try {
      const result = await this.crudRepository.update(id, data);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      throw err;
    }
  }

  async destroy(id) {
    try {
      const result = await this.crudRepository.destroy(id);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      throw err;
    }
  }
}

module.exports = CrudService;
