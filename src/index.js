const bodyParser = require("body-parser");
const express = require("express");

const apiRoutes = require("./router");

const { PORT, QUEUE_NAME, BINDING_KEY } = require("./config/serverConfig");
const db = require("./models");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");
const subscribeEventHandler = require("./controller/subscribeEvent-controller");

const setUpAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
  const channel = await createChannel();
  subscribeMessage(channel, subscribeEventHandler, BINDING_KEY, QUEUE_NAME);
  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
};

setUpAndStartServer();
