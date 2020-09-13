const express = require('express')
const controller = require("../Controller/history")
const redis = require("../middleware/chaceRedis")
const Route = express.Router()

Route.get("/", controller.all)
Route.post("/", controller.add)
Route.put("/", controller.update)
Route.delete("/", controller.delete)

module.exports = Route