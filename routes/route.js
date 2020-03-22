const express = require("express");
const route = express.Router();

const controller = require("../controllers/controller");

route.get("/", controller.getIndex)

route.post("/search", controller.getSearchController);

module.exports = route;