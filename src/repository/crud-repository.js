const { StatusCodes } = require("http-status-codes");
const { RepositoryError, ValidationError } = require("../utils/errors");

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
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new RepositoryError(
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async get(id) {
    try {
      const instance = await this.model.findByPk(id);
      return instance;
    } catch (err) {
      console.log("something went wrong in crud repository inside get");
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new RepositoryError(
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAll() {
    try {
      const instances = await this.model.findAll();
      return instances;
    } catch (err) {
      console.log("something went wrong in crud repository inside getAll");
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new RepositoryError(
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
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
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new RepositoryError(
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
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
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new RepositoryError(
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = CrudRepository;
