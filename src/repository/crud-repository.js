const { StatusCodes } = require("http-status-codes");
const { RepositoryLayerErrorHandler } = require("../utils/errors");

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
      RepositoryLayerErrorHandler(
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async get(id) {
    try {
      const instance = await this.model.findByPk(id);
      if (!instance) {
        throw new Error("product does not exist");
      }
      return instance;
    } catch (err) {
      console.log("something went wrong in crud repository inside get");
      RepositoryLayerErrorHandler(
        err,
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
      RepositoryLayerErrorHandler(
        err,
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
      RepositoryLayerErrorHandler(
        err,
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
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = CrudRepository;
