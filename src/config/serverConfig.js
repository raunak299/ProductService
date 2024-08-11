const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  BINDING_KEY: process.env.BINDING_KEY,
  QUEUE_NAME: process.env.QUEUE_NAME,
};
