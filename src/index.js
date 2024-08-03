const bodyParser = require("body-parser");
const express = require("express");

const PORT = 4000;

const setUpAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
};

setUpAndStartServer();
