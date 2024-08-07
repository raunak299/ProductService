const { ServiceError } = require("../utils/errors");

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
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async get(id) {
    try {
      const result = await this.crudRepository.get(id);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async getAll() {
    try {
      const result = await this.crudRepository.getAll();
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async update(id, data) {
    try {
      const result = await this.crudRepository.update(id, data);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async destroy(id) {
    try {
      const result = await this.crudRepository.destroy(id);
      return result;
    } catch (err) {
      console.log("Something went wrong in crud service");
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }
}

module.exports = CrudService;
