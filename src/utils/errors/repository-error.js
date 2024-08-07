const { StatusCodes } = require("http-status-codes");

class RepositoryError extends Error {
  constructor(message, explanation = "Service layer error", statusCode) {
    super();
    this.name = "RepositoryError";
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = RepositoryError;
