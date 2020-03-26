const express = require("express");
const route = express.Router();

const controller = require("../controllers/controller");

route.get("/", controller.getIndex)

route.post("/search", controller.getSearchController);

route.get("/latest_case", controller.getLatestCase);

route.get("/check_with_date", controller.getCheckWithDate);

module.exports = route;