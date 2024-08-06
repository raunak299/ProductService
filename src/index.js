const bodyParser = require("body-parser");
const express = require("express");

const apiRoutes = require("./router");

const { PORT } = require("./config/serverConfig");
const db = require("./models");

const setUpAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }

  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
};

setUpAndStartServer();
