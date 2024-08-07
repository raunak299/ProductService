const ServiceError = require("../service-error");

function ServiceLayerErrorHandler(err, message, explanation) {
  if (err.name === "RepositoryError" || err.name === "ValidationError") {
    throw err;
  }
  throw new ServiceError(message, explanation);
}

module.exports = ServiceLayerErrorHandler;
