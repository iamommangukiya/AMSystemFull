const express = require("express");
const cors = require("cors");
const { userApi, AcountingApi } = require("./src/api");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  AcountingApi(app);
  userApi(app);
};
