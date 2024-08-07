const { ValidationError } = require("sequelize");
const ServiceError = require("../service-error");
const RepositoryError = require("../repository-error");
const { StatusCodes } = require("http-status-codes");

function RepositoryLayerErrorHandler(
  err,
  message,
  explanation = "Repository layer error",
  statusCode
) {
  if (err.name === "SequelizeValidationError") {
    throw new ValidationError(err);
  }
  throw new RepositoryError(message, explanation, statusCode);
}

module.exports = RepositoryLayerErrorHandler;
